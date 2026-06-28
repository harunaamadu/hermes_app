import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["CUSTOMER", "SELLER"]).default("CUSTOMER"),
  storeName: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: z.treeifyError(parsed.error) },
      { status: 400 },
    );
  }

  const { fullName, email, password, role, storeName } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with that email already exists" },
      { status: 409 },
    );
  }

  const hashed = await bcrypt.hash(password, 12);

  const user = await db.user.create({
  data: {
    name: fullName,
    email,
    password: hashed,
    role,
    ...(role === "SELLER" && storeName
      ? { sellerProfile: { create: { storeName } } }
      : {}),
  },
});

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}