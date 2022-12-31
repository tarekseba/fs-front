import * as React from "react"
import { Page } from "./Page"
import Appbar from "./AppBar"
import { Modal } from "../shared/Modal/Modal"
import { Button } from "@mui/material"
import { ModalOptions, useModal } from "../shared/Modal/ModalProvider"
import { CategoryEdition, EditCategoryForm } from "../features/Categories/table/modalContents/EditCategoryForm"


export const Layout = (): JSX.Element => {
  const { toggleModal }: ModalOptions = useModal()
	return <>
		<Appbar></Appbar>
		<Page></Page>
    <Modal />
    <Button onClick={() => toggleModal({title: "Hello", content: (<EditCategoryForm onSubmitAction={function(values: CategoryEdition): Promise<any> {
        throw new Error("Function not implemented.")
    } } />)})}>Open modal</Button>
	</>
}
