import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const authInstance = NextAuth(authConfig);

export const { handlers, auth, signIn, signOut } = authInstance;
export const { GET, POST } = handlers;
