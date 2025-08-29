import CustomModal from '@/components/common/Modal'
import RegistrationForm from '@/components/forms/RegistrationForm'
import React, { FC } from 'react'

interface Props {
   isOpen: boolean
   onClose: () => void
}

const RegistrationModal: FC<Props> = ({ isOpen, onClose }) => {
   return (
      <CustomModal
         isOpen={isOpen}
         onClose={onClose}
         title='Registration'
      >
         <RegistrationForm onClose={onClose} />
      </CustomModal>
   )
}

export default RegistrationModal