import React from "react";
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
  background-color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 8px;
  background-color: #39ca07;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteConfirmationModal: React.FC<ModalProps> = ({
  show,
  handleClose,
  handleDelete,
}) => {
  return (
    <>
      {show && (
        <ModalBackground>
          <ModalContent>
            <h3>Confirmación de Eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar este elemento?</p>
            <ButtonContainer>
              <Button onClick={handleDelete}>Eliminar</Button>
              <Button onClick={handleClose}>Cancelar</Button>
            </ButtonContainer>
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};

export default DeleteConfirmationModal;
