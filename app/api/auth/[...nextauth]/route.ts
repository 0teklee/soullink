import NextAuth, { AuthOptions, Session } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/prisma/client";

const providers = [
  Google({
    clientId: process.env.NEXT_APP_GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.NEXT_APP_GOOGLE_CLIENT_SECRET as string,
  }),
];

export const authOptions: AuthOptions = {
  providers,
  secret: process.env.NEXT_PUBLIC_SECRET as string,
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      const userId = await prisma.user.findUnique({
        where: {
          email: session.user?.email as string,
        },
        select: {
          id: true,
          nickname: true,
          profilePic: true,
        },
      });

      const newSession: Session = {
        ...session,
        user: {
          ...session.user,
          email: "",
          image: "",
          name: "",
        },
      };

      return {
        ...newSession,
        userId: userId?.id,
        userNickname: userId?.nickname,
        userImage: userId?.profilePic,
        token,
      };
    },
    async signIn({ user }) {
      const userDB = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
        select: {
          id: true,
        },
      });
      const isAllowedToSignIn = userDB && userDB?.id;

      if (isAllowedToSignIn) {
        return true;
      } else {
        return "/signup";
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
