import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "../../../env/server.mjs";
// import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      console.log(session, token);
      if (session.user) {
        session.user.id = "" + token.sub;
      }
      return session;
      // if (session.user) {
      //   session.user.id = user.id;
      // }
      // return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      type: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // const user = await prisma.user.findUnique({
        //   where: {
        //     email,
        //   },
        // });

        // if (!user) {
        //   throw new Error("No valid credentials");
        // } else {
        //   const isPasswordCorrect = await bcrypt.compare(
        //     password,
        //     user?.password
        //   );

        //   if (!isPasswordCorrect) {
        //     throw new Error("No valid credentials");
        //   }
        // }

        // if (email !== "dmadridgarate@gmail.com" || password !== "123456") {
        //   throw new Error("Invalid email or password");
        // }

        const user = {
          id: "1",
          name: "Daniel Madrid",
          email: "dmadridgarate@gmail.com ",
          image: "localhost:3000/images/profile.jpg",
        };

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
