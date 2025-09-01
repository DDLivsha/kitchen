'use client'
import { useAuthStore } from '@/store/auth'
import { useSession } from 'next-auth/react'
import React, { JSX, useEffect } from 'react'

export default function AppLoader({ children }: { children: React.ReactNode }) {

   const { data: session, status } = useSession()
   const { setAuthState } = useAuthStore()

   useEffect(() => {
      setAuthState(status, session)
   }, [status, session]);

   return (
      <>
         {children}
      </>
   )
}
