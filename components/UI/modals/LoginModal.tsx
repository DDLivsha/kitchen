import CustomModal from '@/components/common/Modal'
import LoginForm from '@/components/forms/LoginForm'
import React, { FC } from 'react'

interface Props {
   isOpen: boolean
   onClose: () => void
}

const LoginModal: FC<Props> = ({ isOpen, onClose }) => {
   return (
      <CustomModal
         isOpen={isOpen}
         onClose={onClose}
         title='Login'
      >
         <LoginForm onClose={onClose} />
      </CustomModal>
   )
}

export default LoginModal