import { Button, Form, Input } from '@heroui/react'
import React, { FC } from 'react'

interface Props {
   onClose: () => void
}
const RegistrationForm: FC<Props> = ({ onClose }) => {

   const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      confirmPassword: '',
   })

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('formData :>> ', formData);
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
               if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return 'Invalid email address'
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
               if (value.length < 6) {
                  return 'Password must be at least 6 characters'
               }
               return true
            }}
            />
            <Input
            isRequired
            name='confirmPassword'
            placeholder='Confirm Password'
            type='password'
            value={formData.confirmPassword}
            classNames={{
               innerWrapper: 'bg-default-100',
               input: 'text-sm focus:outline-none'
            }}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            validate={(value) => {
               if (!value) {
                  return 'Confirm Password is required'
               }
               if (value !== formData.password) {
                  return 'Passwords do not match'
               }
               return true
            }}
            />
            <div className='w-full flex gap-4 items-center pt-8 justify-end'>
               <Button variant='light' onPress={onClose}>Cancel</Button>
               <Button color='primary' type='submit'>Register</Button>
            </div>
      </Form>
   )
}

export default RegistrationForm