import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/dashboard/account",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      const isAuthRoute = nextUrl.pathname.startsWith("/dashboard/account");
      const isSellerRoute = nextUrl.pathname.startsWith("/dashboard/seller");
      const isProtected = nextUrl.pathname.startsWith("/dashboard");

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      if (isSellerRoute && role !== "SELLER" && role !== "ADMIN") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      if (isProtected && !isAuthRoute && !isLoggedIn) {
        return Response.redirect(new URL("/dashboard/account", nextUrl));
      }
      return true;
    },
    // jwt/session callbacks unchanged — they already pass role through
  },
  providers: [], // populated in auth.ts — keep this empty here
};
