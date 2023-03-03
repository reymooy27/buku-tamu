import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/server/db/client";

export const authOptions = {
  pages: {
    signIn: "/signin",
  },
  secret: 'sfsgergsregsreg',
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, user }) {
      const isSignIn = user ? true : false
      if (isSignIn) {
        token.username = user.username
        token.password = user.password
      }
      return token
    },
    async session({ session, token }) {
      return { ...session, user: { username: token.username } }
    },
  },
  // adapter: PrismaAdapter(prisma),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
    },
    async authorize(credentials,req){
      const payload = {
        username: credentials.username,
        password: credentials.password,
      };

      const user = await prisma.user.findFirst({
        where:{
          username: payload.username,
        }
      })
      
      if(!user){
        return null
      }

      return user
    }
   })
  ],
};

export default NextAuth(authOptions);