import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import NotificationModal from "./modals/NotificationModal";
import checkLogo from "../assets/icons/checkLogo.svg";

import {
  FormWrapper,
  Form,
  FormHeader,
  Table,
  TableRow,
  TableCell,
  Label,
  Input,
  ButtonContainer,
  Button,
  ButtonCancel,
} from "../styles/FormsStyles";

interface FormData {
  v1: string;
  v2: string;
  v3: string;
  v4: string;
  v5: string;
  o1: string;
  o2: string;
  o3: string;
  o4: string;
  o5: string;
  totalPoints: string;
  percentage: string;
  [key: string]: string;
}

function PortabilidadForm() {
  const [formData, setFormData] = useState<FormData>({
    v1: "0",
    v2: "0",
    v3: "0",
    v4: "0",
    v5: "0",
    o1: "",
    o2: "",
    o3: "",
    o4: "",
    o5: "",
    totalPoints: "0",
    percentage: "0",
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name.startsWith("v")
      ? Math.min(Math.max(parseInt(value), 0), 3).toString()
      : value;
    const updatedFormData = {
      ...formData,
      [name]: newValue,
    };
    if (name.startsWith("v")) {
      const totalPoints =
        parseFloat(formData.v1) +
        parseFloat(formData.v2) +
        parseFloat(formData.v3) +
        parseFloat(formData.v4) +
        parseFloat(formData.v5) -
        parseFloat(formData[name]) +
        parseFloat(newValue);
      const percentage = ((totalPoints / 15) * 100).toFixed(2);
      updatedFormData.totalPoints = totalPoints.toString();
      updatedFormData.percentage = percentage.toString();
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const totalPoints =
        parseFloat(formData.v1) +
        parseFloat(formData.v2) +
        parseFloat(formData.v3) +
        parseFloat(formData.v4) +
        parseFloat(formData.v5);
      const percentage = ((totalPoints / 15) * 100).toFixed(2);

      const response = await axios.post("http://localhost:3230/api/portabilidad/", {
        ...formData,
        totalPoints: totalPoints.toString(),
        percentage: percentage.toString(),
      });
      console.log("Response:", response.data);
      setFormData({
        v1: "0",
        v2: "0",
        v3: "0",
        v4: "0",
        v5: "0",
        o1: "",
        o2: "",
        o3: "",
        o4: "",
        o5: "",
        totalPoints: "",
        percentage: "",
      });
      setShowNotification(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const handleButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormHeader>6. PORTABILIDAD</FormHeader>
          <FormHeader>
            La capacidad del software para ser trasladado de un entorno a otro. El entorno puede
            incluir entornos organizaciones, de hardware o de software.
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
                <Label htmlFor="valor">Valor</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="observaciones">Observaciones</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c1">6.1</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i1">Adaptabilidad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d1">
                  La capacidad del software para ser adaptado a diferentes entornos especificados
                  sin aplicar acciones o medios diferentes de los previstos para el propósito del
                  software considerado. Adaptabilidad incluye la escalabilidad de capacidad interna
                  (Ejemplo: Campos en pantalla, tablas, volúmenes de transacciones, formatos de
                  reporte, etc.). Si el software va a ser adaptado por el usuario final, la
                  adaptabilidad corresponde a la conveniencia de la individualización, y podría
                  afectar la operabilidad.
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  id="v1"
                  name="v1"
                  type="number"
                  value={formData.v1}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  required
                />
              </TableCell>
              <TableCell>
                <Input id="o1" name="o1" type="text" value={formData.o1} onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c2">6.2</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i2">Facildiad de instalación</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d2">
                  La capacidad del software para ser instalado en un ambiente especificado. Si el
                  software va a ser instalado por el usuario final, puede afectar la propiedad y
                  operatividad resultantes.
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  id="v2"
                  name="v2"
                  type="number"
                  value={formData.v2}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  required
                />
              </TableCell>
              <TableCell>
                <Input id="o2" name="o2" type="text" value={formData.o2} onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c3">6.3</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i3">Coexistencia</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d3">
                  La capacidad del software para coexistir con otros productos de software
                  independientes dentro de un mismo entorno, compartiendo recursos comunes.
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  id="v3"
                  name="v3"
                  type="number"
                  value={formData.v3}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  required
                />
              </TableCell>
              <TableCell>
                <Input id="o3" name="o3" type="text" value={formData.o3} onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c4">6.4</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i4">Reemplazabilidad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d4">
                  La capacidad del software para ser utilizado en lugar de otro software, para el
                  mismo propósito y en el mismo entorno. Por ejemplo, la reemplazabilidad de una
                  nueva versión de un software es importante para el usuario cuando dicho software
                  es actualizado (actualizaciones, upgrades).
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  id="v4"
                  name="v4"
                  type="number"
                  value={formData.v4}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  required
                />
              </TableCell>
              <TableCell>
                <Input id="o4" name="o4" type="text" value={formData.o4} onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="c5">6.5</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i5">Conformidad de portabilidad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d5">
                  La capacidad del software para adherirse a estándares o convenciones relacionados
                  a la portabilidad.
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  id="v5"
                  name="v5"
                  type="number"
                  value={formData.v5}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  required
                />
              </TableCell>
              <TableCell>
                <Input id="o5" name="o5" type="text" value={formData.o5} onChange={handleChange} />
              </TableCell>
            </TableRow>
          </Table>
          <FormHeader>
            Total puntos: {formData.totalPoints} de 15 <br />
            Porcentaje total resultado de portabilidad: {formData.percentage}%
          </FormHeader>
          <FormHeader>
            Criterios de evaluación: <br /> <br />
            0 No cumple de 0% a un 30% <br />
            1 Cumple de 31% a 50% <br />
            2 Cumple de 51% a 89% <br />3 Cumple con o más de 90%
          </FormHeader>

          <ButtonContainer>
            <ButtonCancel onClick={handleButtonClick}>Cancelar</ButtonCancel>
            <Button type="submit">Añadir</Button>
          </ButtonContainer>
        </Form>
      </FormWrapper>
      {showNotification && (
        <NotificationModal
          title="Registro añadido"
          description="El registro se ha añadido exitosamente."
          imageUrl={checkLogo}
          buttonText="Aceptar"
          onClose={handleNotificationClose}
          redirectUrl="/"
        />
      )}
    </>
  );
}

export default PortabilidadForm;
