import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  FormWrapper,
  Form,
  FormHeader,
  Table,
  TableRow,
  TableCell,
  Label,
  ButtonContainer,
  Button,
  ButtonCancel,
} from "../styles/FormsStyles";

function MainMenu() {
  const handleButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      <FormWrapper>
        <Form>
          <FormHeader>PARÁMETROS</FormHeader>
          <FormHeader>
            Seleccione los porcentajes según el criterio de evaluación que desea aplicar
            correspondiente a el software a evaluar Ejemplo Para Software Bancario tendría mayor
            peso en los indicadores siguientes FUNCIONALIDAD Y EFICIENCIA Para un Software de
            Capacitación o académico en los indicadores siguientes USABILIDAD, CALIDA EN USO Y
            PORTABILIDAD Estos valores se pueden cambiar según el criterio de los evaluadores
          </FormHeader>
          <Table>
            <TableRow>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="codigo">Código</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="item">Item</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="descripción">Descripción</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="preguntas">Preguntas</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="total">% Total</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c1">1</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Link to="/funcionalidad">
                  <Button type="button">FUNCIONALIDAD</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Label htmlFor="d1">
                  La capacidad del software para proveer las funciones que satisfacen las
                  necesidades explícitas e implícitas cuando el software se utiliza bajo condiciones
                  específicas.
                </Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">5</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">14.00%</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c2">2</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Link to="/fiabilidad">
                  <Button type="button">FIABILIDAD</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Label htmlFor="d2">
                  La capacidad del software para mantener un nivel específico de funcionamiento
                  cuando se está utilizando bajo condiciones especificadas.
                </Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">4</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">14.00%</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c3">3</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Link to="/usabilidad">
                  <Button type="button">USABILIDAD</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Label htmlFor="d3">
                  La capacidad del software de ser entendido, aprendido, usado y atractivo al
                  usuario, cuando es utilizado bajo las condiciones especificadas.
                </Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">5</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">15.00%</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c4">4</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Link to="/eficiencia">
                  <Button type="button">EFICIENCIA</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Label htmlFor="d4">
                  La capacidad del software de proveer un desempeño adecuado, de acuerdo a la
                  cantidad de recursos utilizados y bajo las condiciones específicas.
                </Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">3</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">15.00%</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c5">5</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Link to="/capacidad">
                  <Button type="button">
                    CAPACIDAD <br /> DE MANTENIMIENTO
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <Label htmlFor="d5">
                  Capacidad del software para ser modificado. Las modificaciones pueden incluir
                  correcciones, mejoras o adaptación del software a cambios en el entorno, y
                  especificaciones de requerimientos funcionales.
                </Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">5</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">14.00%</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c6">6</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Link to="/portabilidad">
                  <Button type="button">PORTABILIDAD</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Label htmlFor="d6">
                  La capacidad del software para ser trasladado de un entorno a otro. El entorno
                  puede incluir entornos organizaciones, de hardware o de software.
                </Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">5</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">14.00%</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c7">7</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Link to="/calidad">
                  <Button type="button">CALIDAD EN USO</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Label htmlFor="d7">
                  La capacidad del software para permitirles a usuarios específicos lograr las metas
                  propuestas con eficacia, productividad, seguridad y satisfacción, en contextos
                  especificados de uso.
                </Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">6</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="i7">14.00%</Label>
              </TableCell>
            </TableRow>
          </Table>
          <FormHeader>
            Total puntos: 33 <br />
            Porcentaje Total: 100.00%
          </FormHeader>
          <ButtonContainer>
            <Link to="/total">
              <Button type="button">RESULTADOS TOTALES</Button>
            </Link>
          </ButtonContainer>
        </Form>
      </FormWrapper>
    </>
  );
}

export default MainMenu;
