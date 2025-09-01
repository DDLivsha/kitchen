'use server'
import { saltAndHashPassword } from "@/helpers/password";
import { prisma } from "@/helpers/prisma";
import { FormDataProps } from "@/interfaces/form-data";

export async function registerUser(formData: FormDataProps) {
   const { email, password, confirmPassword } = formData

   if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
   }

   try {

      const existingUser = await prisma.user.findUnique({ where: { email } })

      if (existingUser) {
         throw new Error('User already exists')
      }

      const pwHash = await saltAndHashPassword(password)

      const user = await prisma.user.create({
         data: {
            email: email,
            password: pwHash
         }
      })

      return user

   } catch (error) {
      console.error('error :>> ', error);
      throw new Error('Failed to register user')
   }
}