import styled, {css} from "styled-components";

const colors = {
  white: "#fff",
  black: "#000",
  red: "#cf352b",
  green: "#39ca07",
  orange: "#ff670f",
  text: "rgba(0, 0, 0, 0.7)",
};

const spacing = {
  small: "8px",
  medium: "15px",
  large: "40px",
};

interface ButtonProps {
  $custom1?: boolean;
}

const InputBase = styled.input`
  padding: ${spacing.small};
  border: 1px solid ${colors.black};
  border-radius: 5px;
  height: 34px;
  box-sizing: border-box;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: auto;
`;

export const Form = styled.form`
  padding: ${spacing.large};
  background-color: ${colors.white};
  border-radius: 10px;
  width: 100%;
`;

export const FormHeader = styled.p`
  color: ${colors.text};
  text-align: center;
  font-weight: 550;
  margin-bottom: ${spacing.large};
`;

export const Table = styled.table`
  width: 100%;                // Mantiene la tabla responsive dentro de su contenedor
  max-width: 1200px;           // Establece un ancho máximo para la tabla
  margin: ${spacing.medium} auto;  // Añade un margen automático horizontal para centrar y un margen vertical
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1); // Opcional: añade sombra para elevar la tabla visualmente
  border-collapse: collapse; // Colapsa los bordes de la tabla para un diseño más limpio
`;

export const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9; // Opcional: colores alternos para las filas
  }
`;

export const TableCell = styled.td`
  padding: ${spacing.medium};
  border-bottom: 1px solid #ddd; // Añade una línea de separación entre filas
  text-align: left; // Alinea el texto a la izquierda
`;


export const Label = styled.label`
  font-weight: normal;
  margin-right: ${spacing.small};
`;

export const Input = styled(InputBase)`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around; /* Para espaciar horizontalmente */
  margin-top: ${spacing.large};
`;

export const Button = styled.button<ButtonProps>`
  padding: ${spacing.medium};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: ${colors.white};
  background-color: ${colors.green};
  max-width: 400px;
  /* Centrar verticalmente */
  margin-top: auto;
  margin-bottom: auto;

  /* Nuevo estilo cuando $custom1 es true */
  ${(props) =>
    props.$custom1 &&
    css`
      background-color: ${colors.red}; // Cambiar color a rojo
    `}
`;


export const ButtonCancel = styled.button`
  padding: ${spacing.medium};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: ${colors.white};
  background-color: ${colors.red};
  max-width: 400px;
  /* Centrar verticalmente */
  margin-top: auto;
  margin-bottom: auto;
`;
