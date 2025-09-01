import bcryptjs from "bcryptjs"

export async function saltAndHashPassword(password: string) {
   const salt = 10
   
   const hash = await bcryptjs.hash(password, salt)

   return hash
}