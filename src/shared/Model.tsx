import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface IModel {
  isOpen: boolean;
  // onOpen: () => void;
  onClose: () => void;
  title: string;
  cancelText?: string;
  okText?: string;
  isLoading: boolean;
  // variant: "ghost" | "link" | "outline" | "solid" | "unstyled";
  onOkClick: () => void;
  children?: ReactNode;
}

const CustomModel = ({
  isOpen,
  onClose,
  okText = "DONE",
  cancelText = "Cancel",
  title,
  onOkClick,
  isLoading,
  children,
}: IModel) => {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          bg="blackAlpha.500"
          backdropFilter="blur(5px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              colorScheme="blue"
              onClick={onOkClick}
              isLoading={isLoading}
            >
              {okText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModel;
