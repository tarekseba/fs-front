import React, { PropsWithChildren, useState } from "react"
import { ReactState } from "../../utils/types"
import { ModalParams } from "./Modal"

export interface ModalOptions<T = object> {
  isOpen: boolean
  toggleModal: (params?: ModalParams) => void
  params: ModalParams
  dynamicProps: T
  setDynamicProps: ReactState<T>[1]
}

const ModalContext: React.Context<ModalOptions> = React.createContext({} as ModalOptions)

export const ModalProvider = ({ children }: PropsWithChildren<object>) => {
  const [ isOpen, setIsOpen ]: ReactState<boolean> = useState<boolean>(false)
  const [ params, setParams ]: ReactState<ModalParams> = useState<ModalParams>({} as ModalParams)
  const [ dynamicProps, setDynamicProps ]: ReactState<any> = useState<any>({})

  const toggleModal = (params?: ModalParams) => {
    setIsOpen((state: boolean) => !state) 
    if(params) setParams(params)
  }

  return <ModalContext.Provider value={{ 
    isOpen,
    params,
    dynamicProps,
    toggleModal,
    setDynamicProps 
  }}
  >
    {children}
  </ModalContext.Provider>
}

export const useModal: () => ModalOptions<any> = () => React.useContext<ModalOptions<any>>(ModalContext)
