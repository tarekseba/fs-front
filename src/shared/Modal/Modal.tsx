import React from "react"
import { ModalDisplay } from "./ModalDisplay"
import { ModalOptions, useModal } from "./ModalProvider"

export interface ModalParams {
  title: string
  content: React.ReactNode
}

export const Modal = () => {
  const {isOpen, params, toggleModal}: ModalOptions<any> = useModal()

  return <ModalDisplay isOpen={isOpen} params={params} onClose={() => toggleModal()}/>
}
