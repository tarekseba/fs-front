import React from "react"
import { Dialog, DialogContent, DialogTitle, Divider, Theme } from "@mui/material"
import { ModalParams } from "./Modal"
import { ClassNameMap, makeStyles } from "@mui/styles"

interface Props {
  params: ModalParams
  isOpen: boolean
  onClose: () => void
}

const useStyles: () => ClassNameMap<string> = makeStyles((theme: Theme) => ({
  title: {
    fontSize: 16,
    padding: "5px",
    paddingLeft: "10px"
  }
}))

export const ModalDisplay = ({ isOpen, params, onClose }: Props) => {
  const styles: ClassNameMap<string> = useStyles()
  return <Dialog open={isOpen} onClose={onClose} fullWidth>
    <DialogTitle fontSize={16} className={styles.title}>{params?.title}</DialogTitle>
    <Divider />
    <DialogContent style={{height: "auto"}}>{params?.content}</DialogContent>
  </Dialog>
}
