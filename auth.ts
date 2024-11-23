export const config = {
  runtime: "nodejs",
};

// Library Import
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Schema Import
import { signInSchema } from "./lib/schemas"

// Actions Import
import { getUserByUsername } from "./actions/user-actions"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const { username, password } = await signInSchema.parseAsync(credentials);

        try {
          const user = await getUserByUsername(username, password);
      
          if (!user) {
            return null;
          }

          return user;
        } catch (error: any) {
          console.error("Error in authorize:", error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.username;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;

      return session;
    },
  },
});