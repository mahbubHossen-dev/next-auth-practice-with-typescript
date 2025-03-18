import loginUser from "@/app/actions/auth/loginUser";
import dbConnect, { collectionNamesObj } from "@/DB/dbConnect";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

type Credentials = {
  email: string;
  password: string;
};

type UserData = {
  providerAccountId: string;
  provider: string;
  email?: string;
  image?: string;
  name?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials)
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        // const user = a
        const user = await loginUser(credentials as Credentials);
        if (user) {
          return user;
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email, image, name } = user;
        const userCollection = dbConnect(collectionNamesObj.userCollection);
        const isExistUser = await userCollection.findOne({ providerAccountId });
        if (!isExistUser) {
          const userData: UserData = { providerAccountId, provider, email, image, name };
          await userCollection.insertOne(userData);
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
