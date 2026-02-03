import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

// Schema de validación para login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // Credentials provider para login con email/password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
          return null;
        }

        // TODO: Implementar verificación de contraseña con bcrypt
        // Por ahora, solo para desarrollo
        const { email } = result.data;

        // En producción, conectar con la base de datos
        if (process.env.DATABASE_URL) {
          const { getDb } = await import("@/shared/db");
          const db = getDb();
          const users = await db.query.users.findMany({
            where: (users, { eq }) => eq(users.email, email),
            limit: 1,
          });

          if (users.length > 0) {
            return {
              id: users[0].id,
              email: users[0].email,
              name: users[0].name,
              image: users[0].image,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Tipo extendido de sesión
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
