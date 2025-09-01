import { signInWithCredentials } from '@/actions/sign-in'
import { Button, Form, Input } from '@heroui/react'
import React, { FC } from 'react'

interface Props {
   onClose: () => void
}
const LoginForm: FC<Props> = ({ onClose }) => {

   const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      confirmPassword: '',
   })

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      await signInWithCredentials(formData.email, formData.password)

      window.location.reload()

      onClose()
   }

   return (
      <Form className='w-full' onSubmit={handleSubmit}>
         <Input
            aria-label='Email'
            isRequired
            name='email'
            placeholder='Email'
            type='email'
            value={formData.email}
            classNames={{
               innerWrapper: 'bg-default-100',
               input: 'text-sm focus:outline-none'
            }}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            validate={(value) => {
               if (!value) {
                  return 'Email is required'
               }
               return true
            }}
         />
         <Input
            isRequired
            name='password'
            placeholder='Password'
            type='password'
            value={formData.password}
            classNames={{
               innerWrapper: 'bg-default-100',
               input: 'text-sm focus:outline-none'
            }}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            validate={(value) => {
               if (!value) {
                  return 'Password is required'
               }
               return true
            }}
         />
         <div className='w-full flex gap-4 items-center pt-8 justify-end'>
            <Button variant='light' onPress={onClose}>Cancel</Button>
            <Button color='primary' type='submit'>Login</Button>
         </div>
      </Form>
   )
}

export default LoginForm