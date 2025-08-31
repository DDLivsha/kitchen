import { signInSchema } from "@/schema/zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/helpers/prisma";
import { getUserFromDb } from "@/helpers/user";
import bcryptjs from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: PrismaAdapter(prisma),
   providers: [
      Credentials({
         credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
         },
         authorize: async (credentials) => {

            if (!credentials?.email || !credentials?.password) {
               throw new Error('Email and password are required')
            }

            const { email, password } = await signInSchema.parseAsync(credentials)

            const user = await getUserFromDb(email)

            if (!user) {
               throw new Error('Invalid credentials')
            }

            const isPasswordValid = await bcryptjs.compare(password, user.password)

            if (!isPasswordValid) {
               throw new Error('Invalid credentials')
            }

            return { id: user.id, email: user.email }
         }
      })
   ],
})