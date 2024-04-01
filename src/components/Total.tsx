import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
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

interface Usabilidad {
  totalPoints: number;
  percentage: number;
}

interface Fiabilidad {
  totalPoints: number;
  percentage: number;
}

interface Funcionalidad {
  totalPoints: number;
  percentage: number;
}

interface Eficiencia {
  totalPoints: number;
  percentage: number;
}

interface Capacidad {
  totalPoints: number;
  percentage: number;
}

interface Portabilidad {
  totalPoints: number;
  percentage: number;
}

interface Calidad {
  totalPoints: number;
  percentage: number;
}

function Total() {
  const [usabilidades, setUsabilidades] = useState<Usabilidad[]>([]);
  const [fiabilidades, setFiabilidades] = useState<Fiabilidad[]>([]);
  const [funcionalidades, setFuncionalidades] = useState<Funcionalidad[]>([]);
  const [eficiencias, setEficiencias] = useState<Eficiencia[]>([]);
  const [capacidades, setCapacidades] = useState<Capacidad[]>([]);
  const [portabilidades, setPortabilidades] = useState<Portabilidad[]>([]);
  const [calidades, setCalidades] = useState<Calidad[]>([]);
  const [totalPointsSum, setTotalPointsSum] = useState<number>(0);
  const [percentageSum, setPercentageSum] = useState<number>(0);

  useEffect(() => {
    fetchUsabilidades();
    fetchFiabilidades();
    fetchFuncionalidades();
    fetchEficiencias();
    fetchCapacidades();
    fetchPortabilidades();
    fetchCalidades();
  }, []);

  useEffect(() => {
    const sum = [
      ...usabilidades,
      ...fiabilidades,
      ...funcionalidades,
      ...eficiencias,
      ...capacidades,
      ...portabilidades,
      ...calidades,
    ]
      .map((item) => item.totalPoints)
      .reduce((acc, curr) => acc + curr, 0);
    setTotalPointsSum(sum);

    const percentageSum = [
      ...usabilidades,
      ...fiabilidades,
      ...funcionalidades,
      ...eficiencias,
      ...capacidades,
      ...portabilidades,
      ...calidades,
    ]
      .map((item) => item.percentage)
      .reduce((acc, curr) => acc + curr, 0);
    setPercentageSum(percentageSum);
  }, [
    usabilidades,
    fiabilidades,
    funcionalidades,
    eficiencias,
    capacidades,
    portabilidades,
    calidades,
  ]);

  const fetchUsabilidades = async () => {
    try {
      const response = await fetch("http://localhost:3230/api/usabilidad/");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      setUsabilidades(data);
    } catch (error) {
      console.error("Error fetching usabilidades:", error);
    }
  };

  const fetchFiabilidades = async () => {
    try {
      const response = await fetch("http://localhost:3230/api/fiabilidad/");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      setFiabilidades(data);
    } catch (error) {
      console.error("Error fetching fiabilidades:", error);
    }
  };

  const fetchFuncionalidades = async () => {
    try {
      const response = await fetch("http://localhost:3230/api/funcionalidad/");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      setFuncionalidades(data);
    } catch (error) {
      console.error("Error fetching funcionalidades:", error);
    }
  };

  const fetchEficiencias = async () => {
    try {
      const response = await fetch("http://localhost:3230/api/eficiencia/");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      setEficiencias(data);
    } catch (error) {
      console.error("Error fetching eficiencias:", error);
    }
  };

  const fetchCapacidades = async () => {
    try {
      const response = await fetch("http://localhost:3230/api/capacidad/");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      setCapacidades(data);
    } catch (error) {
      console.error("Error fetching capacidades:", error);
    }
  };

  const fetchPortabilidades = async () => {
    try {
      const response = await fetch("http://localhost:3230/api/portabilidad/");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      setPortabilidades(data);
    } catch (error) {
      console.error("Error fetching portabilidades:", error);
    }
  };

  const fetchCalidades = async () => {
    try {
      const response = await fetch("http://localhost:3230/api/calidad/");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      setCalidades(data);
    } catch (error) {
      console.error("Error fetching calidades:", error);
    }
  };

  return (
    <>
      <FormWrapper>
        <Form>
          <FormHeader>8. RESULTADOS</FormHeader>
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
                <Label htmlFor="preguntas">Valor</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="total">Máximo</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="total">% Resultado</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="total">Máximo</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                <Label htmlFor="total">% Global</Label>
              </TableCell>
            </TableRow>
            {funcionalidades.map((funcionalidad, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Label htmlFor={`c${index + funcionalidades.length + 1}`}>{index + 1}</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label>FUNCIONALIDAD</Label>
                </TableCell>
                <TableCell>
                  <Label htmlFor={`d${index + funcionalidades.length + 1}`}>
                    La capacidad del software para proveer las funciones que satisfacen las
                    necesidades explícitas e implícitas cuando el software se utiliza bajo
                    condiciones específicas.
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`v${index + funcionalidades.length + 1}`}>
                    {funcionalidad.totalPoints}
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + funcionalidades.length + 1}`}>15</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`r${index + funcionalidades.length + 1}`}>
                    {funcionalidad.percentage}%
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + funcionalidades.length + 1}`}>14.00%</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`g${index + funcionalidades.length + 1}`}>
                    {(funcionalidad.percentage * 0.14).toFixed(2)}%
                  </Label>
                </TableCell>
              </TableRow>
            ))}
            {fiabilidades.map((fiabilidad, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Label htmlFor={`c${index + fiabilidades.length + 1}`}>{index + 2}</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label>FIABILIDAD</Label>
                </TableCell>
                <TableCell>
                  <Label htmlFor={`d${index + fiabilidades.length + 1}`}>
                    La capacidad del software para mantener un nivel específico de funcionamiento
                    cuando se está utilizando bajo condiciones especificadas.
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`v${index + fiabilidades.length + 1}`}>
                    {fiabilidad.totalPoints}
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + fiabilidades.length + 1}`}>12</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`r${index + fiabilidades.length + 1}`}>
                    {fiabilidad.percentage}%
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + fiabilidades.length + 1}`}>14.00%</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`g${index + fiabilidades.length + 1}`}>
                    {(fiabilidad.percentage * 0.14).toFixed(2)}%
                  </Label>
                </TableCell>
              </TableRow>
            ))}
            {usabilidades.map((usabilidad, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Label htmlFor={`c${index + 1}`}>{index + 3}</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label>USABILIDAD</Label>
                </TableCell>
                <TableCell>
                  <Label htmlFor={`d${index + 1}`}>
                    La capacidad del software de ser entendido, aprendido, usado y atractivo al
                    usuario, cuando es utilizado bajo las condiciones especificadas.
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`v${index + 1}`}>{usabilidad.totalPoints}</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + 1}`}>15</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`r${index + 1}`}>{usabilidad.percentage}%</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + 1}`}>15.00%</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`g${index + 1}`}>
                    {(usabilidad.percentage * 0.15).toFixed(2)}%
                  </Label>
                </TableCell>
              </TableRow>
            ))}
            {eficiencias.map((eficiencia, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Label htmlFor={`c${index + eficiencias.length + 1}`}>{index + 4}</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label>EFICIENCIA</Label>
                </TableCell>
                <TableCell>
                  <Label htmlFor={`d${index + eficiencias.length + 1}`}>
                    La capacidad del software de proveer un desempeño adecuado, de acuerdo a la
                    cantidad de recursos utilizados y bajo las condiciones específicas.
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`v${index + eficiencias.length + 1}`}>
                    {eficiencia.totalPoints}
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + eficiencias.length + 1}`}>9</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`r${index + eficiencias.length + 1}`}>
                    {eficiencia.percentage}%
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + eficiencias.length + 1}`}>15.00%</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`g${index + eficiencias.length + 1}`}>
                    {(eficiencia.percentage * 0.15).toFixed(2)}%
                  </Label>
                </TableCell>
              </TableRow>
            ))}
            {capacidades.map((capacidad, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Label htmlFor={`c${index + capacidades.length + 1}`}>{index + 5}</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label>CAPACIDAD DE MANTENIMIENTO</Label>
                </TableCell>
                <TableCell>
                  <Label htmlFor={`d${index + capacidades.length + 1}`}>
                    Capacidad del software para ser modificado. Las modificaciones pueden incluir
                    correcciones, mejoras o adaptación del software a cambios en el entorno, y
                    especificaciones de requerimientos funcionales.
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`v${index + capacidades.length + 1}`}>
                    {capacidad.totalPoints}
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + capacidades.length + 1}`}>15</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`r${index + capacidades.length + 1}`}>
                    {capacidad.percentage}%
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + capacidades.length + 1}`}>14.00%</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`g${index + capacidades.length + 1}`}>
                    {(capacidad.percentage * 0.14).toFixed(2)}%
                  </Label>
                </TableCell>
              </TableRow>
            ))}
            {portabilidades.map((portabilidad, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Label htmlFor={`c${index + portabilidades.length + 1}`}>{index + 6}</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label>PORTABILIDAD</Label>
                </TableCell>
                <TableCell>
                  <Label htmlFor={`d${index + portabilidades.length + 1}`}>
                    La capacidad del software para ser trasladado de un entorno a otro. El entorno
                    puede incluir entornos organizaciones, de hardware o de software.
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`v${index + portabilidades.length + 1}`}>
                    {portabilidad.totalPoints}
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + portabilidades.length + 1}`}>15</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`r${index + portabilidades.length + 1}`}>
                    {portabilidad.percentage}%
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + portabilidades.length + 1}`}>14.00%</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`g${index + portabilidades.length + 1}`}>
                    {(portabilidad.percentage * 0.14).toFixed(2)}%
                  </Label>
                </TableCell>
              </TableRow>
            ))}
            {calidades.map((calidad, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Label htmlFor={`c${index + calidades.length + 1}`}>{index + 7}</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label>CALIDAD EN USO</Label>
                </TableCell>
                <TableCell>
                  <Label htmlFor={`d${index + calidades.length + 1}`}>
                    La capacidad del software para permitirles a usuarios específicos lograr las
                    metas propuestas con eficacia, productividad, seguridad y satisfacción, en
                    contextos especificados de uso.
                  </Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`v${index + calidades.length + 1}`}>{calidad.totalPoints}</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + calidades.length + 1}`}>18</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`r${index + calidades.length + 1}`}>{calidad.percentage}%</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`i${index + calidades.length + 1}`}>14.00%</Label>
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Label htmlFor={`g${index + calidades.length + 1}`}>
                    {(calidad.percentage * 0.14).toFixed(2)}%
                  </Label>
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <FormHeader>
            Total puntos: {totalPointsSum} de 99 <br />
            Porcentaje Total: {totalPointsSum.toFixed(2)}%
          </FormHeader>
          <FormHeader>
            Resultados del ejercicio: <br /> <br />
            0 A 30% DEFICIENTE <br />
            31 A 50% INSUFICIENTE <br />
            51 A 70% ACEPTABLE <br />
            71 A 89% SOBRESALIENTE <br />
            MAS DE 90% EXCELENTE
          </FormHeader>
          <ButtonContainer>
            <Link to="/">
              <Button type="button">RETROCEDER</Button>
            </Link>
          </ButtonContainer>
        </Form>
      </FormWrapper>
    </>
  );
}

export default Total;
