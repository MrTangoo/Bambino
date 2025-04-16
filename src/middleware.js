import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token }) => {
      // Autoriser si token existe (connexion requise)
      return !!token;
    },
  },
  async middleware(req) {
    const token = req.nextauth.token;
    const url = req.nextUrl;

    // Redirection des non-admins qui tentent d'accéder à /admin
    if (url.pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Sinon, continuer normalement
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/dashboard", "/new", "/admin"], // 👈 Routes protégées
};
