import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { loginSchema } from "@/lib/validators";

const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async credentials => {
        if (!credentials) {
          return null;
        }

        const parsed = loginSchema.safeParse({
          email: credentials.email,
          password: credentials.password
        });

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        await dbConnect();
        const user = await UserModel.findOne({ email }).lean();

        if (!user) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user._id?.toString() ?? "",
          name: user.name,
          email: user.email
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name ?? session.user.name ?? "";
        session.user.email = token.email ?? session.user.email ?? "";
        session.user.id = token.sub ?? session.user.id ?? "";
      }

      return session;
    }
  },
  pages: {
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default authConfig;
