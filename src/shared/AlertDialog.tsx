import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import React from "react"

interface IAlertDialog {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  description: string;
  cancelText?: string;
  okText?: string;
  variant: "ghost" | "link" | "outline" | "solid" | "unstyled",
  isLoading: boolean
  onOkHandler: () => void;
}

const CustomAlertDialog = ({
  isOpen,
  onClose, 
  title,
  description,
  cancelText = "Cancel",
  okText = "Ok",
  variant,
  isLoading,
  onOkHandler
}: IAlertDialog) => {
  
  const cancelRef = React.useRef<HTMLButtonElement>()

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef as React.RefObject<HTMLButtonElement>}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {description}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef as React.RefObject<HTMLButtonElement>} onClick={onClose}>
              {cancelText}
            </Button>
            <Button colorScheme='red' ml={3} variant={variant} onClick={onOkHandler} isLoading={isLoading}>
              {okText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CustomAlertDialog;