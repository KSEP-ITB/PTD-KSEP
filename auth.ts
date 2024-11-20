export const config = {
  runtime: "nodejs",
};

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/schemas"
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

        // Validasi input menggunakan signInSchema
        const { username, password } = await signInSchema.parseAsync(
          credentials
        );

        let user;
        try {
          // Dapatkan user berdasarkan username dan password
          user = await getUserByUsername(username, password);
        } catch (error) {
          // Fungsi sebelumnya ngethrow error
          console.error("User not found.");
          throw new Error("User not found.");
        }

        if (!user) {
          console.error("User not found.");
          throw new Error("Invalid username or passoword.");
        }

        console.log("USER", user)
        return user
      },
    }),
  ],
  callbacks: {
    // Fungsi callback untuk JWT
    async jwt({ token, user }) {
      // Jika user ada (saat login), tambahkan ke token
      if (user) {
        token.id = user.id;
        token.name = user.username;
        token.role = user.role;
      }

      return token;
    },
    // Fungsi callback untuk sesi
    async session({ session, token }) {
      // Tambahkan properti dari token ke sesi
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;

      return session;
    },
  },
});