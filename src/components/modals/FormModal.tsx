import React, { ReactNode } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, children }) => {
  return (
    <>
      {show && (
        <ModalBackground>
          <ModalContent>
            <CloseButton onClick={handleClose}>×</CloseButton>
            {children}
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};

export default Modal;
