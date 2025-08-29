import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react'
import React, { FC } from 'react'

interface Props {
   isOpen: boolean
   onClose: () => void
   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   title: string
   children: React.ReactNode
}
const CustomModal: FC<Props> = ({ isOpen, onClose, size = 'xs', title, children }) => {
   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         size={size}
      >
         <ModalContent>
            <ModalHeader className="border-b">
               <h3 className='text-xl text-gray-800 font-semibold'>{title}</h3>
            </ModalHeader>
            <ModalBody className='space-y-4 py-6'>{children}</ModalBody>
         </ModalContent>
      </Modal>
   )
}

export default CustomModal