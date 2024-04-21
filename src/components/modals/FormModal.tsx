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
  width: auto; // Ancho automático basado en el contenido interno
  max-width: 300px; // Un máximo que evita que el modal sea demasiado grande
  display: flex; // Usando Flexbox
  flex-direction: column; // Alinea los hijos en columna
  align-items: stretch; // Los hijos se expanden para llenar el ancho del contenedor
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Sombra ligera para darle profundidad
  position: relative; // Posición relativa para el botón de cierre
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
            {children}
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};


export default Modal;
