import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; 
const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
}; 
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL, 
}); 
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, 
  }); 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 
export default prisma; 


// hide ************************
// import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// function createPrismaClient() {
//   const adapter = new PrismaNeon({
//     connectionString: process.env.DATABASE_URL!,
//   });
//   return new PrismaClient({ adapter });
// }

// export const db = globalThis.prisma ?? createPrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;