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
  padding: 20px;
  border-radius: 8px;
  width: auto;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
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
        <ModalBackground onClick={handleClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {children}
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};

export default Modal;
