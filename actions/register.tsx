'use server'
import { prisma } from "@/helpers/prisma";
import { FormDataProps } from "@/interfaces/form-data";

export async function registerUser(formData: FormDataProps) {
   const { email, password, confirmPassword } = formData

   try {
      const user = await prisma.user.create({
         data: {
            email: email,
            password: password
         }
      })

      return user

   } catch (error) {
      console.error('error :>> ', error);
      throw new Error('Failed to register user')
   }
}