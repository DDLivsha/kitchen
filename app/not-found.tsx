import { Button } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
   return (
      <div className='flex flex-col items-center justify-center w-full h-[70dvh]'>
         <div className='text-8xl font-bold text-gray-300'>404</div>
         <h1 className='text-3xl font-bold tracking-tight'>Page not found</h1>
         <div className='pt-6'>
            <Button as={Link} color='primary' variant='shadow' href='/'>Back to home</Button>
         </div>
      </div>
   )
}
