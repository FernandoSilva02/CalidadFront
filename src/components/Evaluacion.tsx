import React, { useState, useEffect } from "react";
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
} from "../styles/FormsStyles";

import styled from "styled-components";

// Definir un nuevo componente para la cuadrícula de inputs
const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Crear tres columnas de igual ancho */
  grid-gap: 10px; /* Espacio entre los inputs */
`;

interface DataItem {
  _id: string;
  item: string;
  description: string;
  preguntas: number;
  total: number;
  atributosCount?: number;
  porcentaje?: number;
}

function Evaluacion() {
  const [data, setData] = useState<DataItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState<DataItem>({
    _id: "",
    item: "",
    description: "",
    preguntas: 0,
    total: 0,
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3230/api/parametro")
      .then((response) => response.json())
      .then((data: DataItem[]) => {
        Promise.all(
          data.map((item) =>
            fetch(`http://localhost:3230/api/atributos?parametro=${item._id}`)
              .then((response) => response.json())
              .then((atributos) => {
                item.atributosCount = atributos.length;
                return item;
              })
          )
        ).then((dataWithAtributosCount) => {
          const totalItems = dataWithAtributosCount.length;
          const equalPercentage = totalItems > 0 ? 100 / totalItems : 0;
          dataWithAtributosCount.forEach((item) => (item.porcentaje = equalPercentage));
          setData(dataWithAtributosCount);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ _id: "", item: "", description: "", preguntas: 0, total: 0 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "preguntas" || name === "total" ? parseInt(value) : value,
    }));
  };

  const handleEditItem = (item: DataItem) => {
    setFormData(item);
    setShowModal(true);
  };

  const handleOpenDeleteModal = (id: string) => {
    setSelectedItemId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItemId(null);
  };

  const handleDeleteItem = (id: string) => {
    fetch(`http://localhost:3230/api/parametro/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // Fetch data again after deletion
        } else {
          console.error("Error al eliminar el parámetro:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el parámetro:", error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = formData._id
      ? `http://localhost:3230/api/parametro/${formData._id}`
      : "http://localhost:3230/api/parametro";
    const method = formData._id ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newDataItem) => {
        fetchData(); // Fetch data again after editing
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const totalAtributosCount = data.reduce((acc, item) => acc + (item.atributosCount || 0), 0);

  return (
    <>
      <FormWrapper>
        <Form>
          <FormHeader>EVALUACIÓN DE PARÁMETROS</FormHeader>
          <FormHeader>Seleccione el parámetro a evaluar</FormHeader>
        </Form>
      </FormWrapper>
      <Table>
        <InputGrid>
          {data.map((item, index) => (
            <TableRow key={index}>
              <Link to={`/evaluacion/${item._id}`} style={{ display: "flex", justifyContent: "center" }}>
                <Button>{item.item}</Button>
              </Link>
            </TableRow>
          ))}
        </InputGrid>
      </Table>
      <ButtonContainer>
        <Link to="/total">
          <Button type="button">FINALIZAR EVALUACIÓN</Button>
        </Link>
      </ButtonContainer>
    </>
  );
}

export default Evaluacion;
