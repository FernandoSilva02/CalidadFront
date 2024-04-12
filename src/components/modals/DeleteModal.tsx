import React from "react";
import styled from "styled-components";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const ModalOverlay = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteConfirmationModal: React.FC<ModalProps> = ({
  show,
  handleClose,
  handleDelete,
}) => {
  return (
    <ModalOverlay show={show}>
      <ModalContent>
        <h2>Confirmación de Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar este elemento?</p>
        <ButtonContainer>
          <Button onClick={handleDelete}>Eliminar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteConfirmationModal;
