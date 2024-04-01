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
  o1: string;
  o2: string;
  o3: string;
  o4: string;
  totalPoints: string;
  percentage: string;
  [key: string]: string;
}

function FiablidadForm() {
  const [formData, setFormData] = useState<FormData>({
    v1: "0",
    v2: "0",
    v3: "0",
    v4: "0",
    o1: "",
    o2: "",
    o3: "",
    o4: "",
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
        parseFloat(formData.v4) -
        parseFloat(formData[name]) +
        parseFloat(newValue);
      const percentage = ((totalPoints / 12) * 100).toFixed(2);
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
        parseFloat(formData.v4);
      const percentage = ((totalPoints / 12) * 100).toFixed(2);

      const response = await axios.post("http://localhost:3230/api/fiabilidad/", {
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
        o1: "",
        o2: "",
        o3: "",
        o4: "",
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
          <FormHeader>2. FIABLIDAD</FormHeader>
          <FormHeader>
            La capacidad del software para mantener un nivel específico de funcionamiento cuando se
            está utilizando bajo condiciones especificadas.
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
                <Label htmlFor="c1">2.1</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i1">Madurez</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d1">
                  La capacidad del software para evitar fallas como resultado de errores en el
                  software.
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
                <Label htmlFor="c2">2.2</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i2">Tolerancia a errores</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d2">
                  La capacidad del producto de software para mantener un nivel especificado de
                  funcionamiento en caso de errores del software o de incumplimiento de su interfaz
                  especificada. El nivel especificado de funcionamiento puede incluir la falta de
                  capacidad de seguridad.
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
                <Label htmlFor="c3">2.3</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i3">Recuperabilidad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d3">
                  La capacidad del software para restablecer un nivel especificado de funcionamiento
                  y recuperar los datos afectados directamente en el caso de una falla. Después de
                  una falla, un software a veces estará no disponible por cierto período del tiempo,
                  intervalo en el cual se evaluará su recuperabilidad.
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
                <Label htmlFor="c4">2.4</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="i4">Conformidad de la fiabilidad</Label>
              </TableCell>
              <TableCell>
                <Label htmlFor="d4">
                  La capacidad del software para adherirse a las normas, convenciones o regulaciones
                  relativas a la fiabilidad.
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
          </Table>
          <FormHeader>
            Total puntos: {formData.totalPoints} de 12 <br />
            Porcentaje total resultado de fiabilidad: {formData.percentage}%
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

export default FiablidadForm;
