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

function FuncionalidadForm() {
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

      const response = await axios.post("http://localhost:3230/api/funcionalidad/", {
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
          <FormHeader>1. FUNCIONALIDAD</FormHeader>
          <FormHeader>
            La capacidad del software para proveer las funciones que satisfacen las necesidades
            explícitas e implícitas cuando el software se utiliza bajo condiciones específicas.
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
                <Label htmlFor="c1">1.1</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i1">Adecuación</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d1">
                  La capacidad del software para proveer un adecuado conjunto de funciones para las
                  tareas y objetivos especificados por el usuario. Ejemplos de adecuación son la
                  composición orientada a tareas de funciones a partir de sub funciones que las
                  constituyen, y las capacidades de las tablas.
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
                <Label htmlFor="c2">1.2</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i2">Exactitud</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d2">
                  La capacidad del software para proveer los resultados o efectos acordados con un
                  grado necesario de precisión.
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
                <Label htmlFor="c3">1.3</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i3">Interoperabilidad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d3">
                  La capacidad del software de interactuar con uno o más sistemas especificados. La
                  interoperabilidad se utiliza en lugar de compatibilidad para evitar una posible
                  ambigüedad con la reemplazabilidad.
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
                <Label htmlFor="c4">1.4</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i4">Seguridad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d4">
                  La capacidad del software para proteger la informacion y los datos de modo que las
                  personas o los sistemas no autorizados no puedan leerlos o modificarlos, y a las
                  personas o sistemas autorizados no se les niegue el acceso a ellos. La seguridad
                  en un sentido amplio se define como característica de la calidad en uso, pues no
                  se relaciona con el software solamente sino con todo un sistema.
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
                <Label htmlFor="c5">1.5</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i5">Conformidad de la funcionalidad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d5">
                  La capacidad del software de adherirse a los estándares, convenciones o
                  regulaciones legales y prescripciones similares referentes a la funcionalidad.
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
            Porcentaje total resultado de funcionalidad: {formData.percentage}%
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

export default FuncionalidadForm;
