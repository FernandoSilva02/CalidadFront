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
  v6: string;
  o1: string;
  o2: string;
  o3: string;
  o4: string;
  o5: string;
  o6: string;
  totalPoints: string;
  percentage: string;
  [key: string]: string;
}

function CalidadForm() {
  const [formData, setFormData] = useState<FormData>({
    v1: "0",
    v2: "0",
    v3: "0",
    v4: "0",
    v5: "0",
    v6: "0",
    o1: "",
    o2: "",
    o3: "",
    o4: "",
    o5: "",
    o6: "",
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
        parseFloat(updatedFormData.v1) +
        parseFloat(updatedFormData.v2) +
        parseFloat(updatedFormData.v3) +
        parseFloat(updatedFormData.v4) +
        parseFloat(updatedFormData.v5) +
        parseFloat(updatedFormData.v6);

      const percentage = ((totalPoints / 18) * 100).toFixed(2);

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
        parseFloat(formData.v5) +
        parseFloat(formData.v6);
      const percentage = ((totalPoints / 18) * 100).toFixed(2);

      const response = await axios.post("http://localhost:3230/api/calidad/", {
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
        v6: "0",
        o1: "",
        o2: "",
        o3: "",
        o4: "",
        o5: "",
        o6: "",
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
          <FormHeader>7. CALIDAD EN USO</FormHeader>
          <FormHeader>
            La capacidad del software para permitirles a usuarios específicos lograr las metas
            propuestas con eficacia, productividad, seguridad y satisfacción, en contextos
            especificados de uso.
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
                <Label htmlFor="c1">7.1</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i1">Eficacia</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d1">
                  La capacidad del software para permitir a los usuarios lograr las metas
                  especificadas con exactitud e integridad, en un contexto especificado de uso.
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
                <Label htmlFor="c2">7.2</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i2">Productividad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d2">
                  La capacidad del software para permitir a los usuarios emplear cantidades
                  apropiadas de recursos, en relación a la eficacia lograda en un contexto
                  especificado de uso. Los recursos relevantes pueden incluir: tiempo para completar
                  la tarea, esfuerzo del usuario, materiales o costo financiero.
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
                <Label htmlFor="c3">7.3</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i3">Seguridad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d3">
                  La capacidad del software para permitir a los usuarios emplear cantidades
                  apropiadas de recursos, en relación a la eficacia lograda en un contexto
                  especificado de uso. Los recursos relevantes pueden incluir: tiempo para completar
                  la tarea, esfuerzo del usuario, materiales o costo financiero.
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
                <Label htmlFor="c4">7.4</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i4">Satisfacción</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d4">
                  La capacidad del software para satisfacer a los usuarios en un contexto
                  especificado de uso. La satisfacción es la respuesta del usuario a la interacción
                  con el producto, e incluye las actitudes hacia el uso del producto.
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
                <Label htmlFor="c5">7.5</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i5">Mercadeo</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d5">
                  El tiempo que tiene el software o proveedor en el caso del que producto sea a la
                  medida en el mercado. Menor a un año=0, de 1 a 2 años =1, de 2 a 3 años=2 y de mas
                  de 3 años=3.
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
            <TableRow>
              <TableCell>
                <Label htmlFor="c6">7.6</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i6">Estandarización</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d6">
                  Numero de Instalaciones en diferentes empresas locales, si es un producto a la
                  medida Numero de Softwares instalados por el proveedor. Ninguno=0, de 1 a 3=1 de 4
                  a 6=2, mas 6=3.
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  id="v6"
                  name="v6"
                  type="number"
                  value={formData.v6}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  required
                />
              </TableCell>
              <TableCell>
                <Input id="o6" name="o6" type="text" value={formData.o6} onChange={handleChange} />
              </TableCell>
            </TableRow>
          </Table>
          <FormHeader>
            Total puntos: {formData.totalPoints} de 18 <br />
            Porcentaje total resultado de calidad en uso: {formData.percentage}%
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

export default CalidadForm;
