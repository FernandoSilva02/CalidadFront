import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "./modals/FormModal";
import DeleteConfirmationModal from "./modals/DeleteModal";
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

interface DataItem {
  percentage: number;
  totalPoints: number;
  _id: string;
  item: string;
  description: string;
  valor: number;
  observation: string;
}

interface ParametroData {
  item: string;
  description: string;
}

function EvaluacionForm() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DataItem[]>([]);
  const [parametroData, setParametroData] = useState<ParametroData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState<DataItem>({
    _id: "",
    item: "",
    description: "",
    valor: 0,
    observation: "",
    percentage: 0,
    totalPoints: 0,
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [totalValor, setTotalValor] = useState<number>(0); // Nuevo estado para almacenar la suma de los valores
  const [totalPercentage, setTotalPercentage] = useState<number>(0); // Nuevo estado para almacenar el porcentaje total
  const preguntasPorItem = 3; // Cantidad de preguntas por item

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    // Calcula la suma total de los valores cada vez que data cambia
    const sum = data.reduce((total, item) => total + item.valor, 0);
    setTotalValor(sum);
    // Calcula el total de puntos basado en la cantidad de preguntas por item
    const totalPoints = sum / preguntasPorItem;
    // Calcula el porcentaje total
    const percentage = ((sum / (data.length * preguntasPorItem)) * 100).toFixed(2);
    setTotalPercentage(parseFloat(percentage)); // Convert percentage to a number
  }, [data, preguntasPorItem]);

  const fetchData = () => {
    fetch(`http://localhost:3230/api/atributos/?parametro=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos del servidor:", data);
        setData(Array.isArray(data) ? data : []); // Ensure data is always an array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]); // Set to empty array on error
      });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ 
      _id: "", 
      item: "", 
      description: "", 
      valor: 0, 
      observation: "",
      percentage: 0,
      totalPoints: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "valor" ? parseInt(value) : value,
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
    fetch(`http://localhost:3230/api/atributos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setData((prevData) => prevData.filter((item) => item._id !== id));
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
      ? `http://localhost:3230/api/atributos/${formData._id}`
      : "http://localhost:3230/api/atributos";
    const method = formData._id ? "PUT" : "POST";

    const requestBody = {
      ...formData,
      parametro: id,
    };

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((newDataItem) => {
        // Correctly handle both PUT and POST responses
        if (formData._id) {
          // We're updating an item
          setData((prevData) =>
            prevData.map((item) => (item._id === formData._id ? newDataItem : item))
          );
        } else {
          // We're adding a new item
          setData((prevData) =>
            Array.isArray(prevData) ? [...prevData, newDataItem] : [newDataItem]
          );
        }
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <>
      <FormWrapper>
        <Form>
          <FormHeader>
            {parametroData ? (
              <>
                <p>{parametroData.item}</p>
                <p>{parametroData.description}</p>
              </>
            ) : (
              "Cargando datos del parámetro..."
            )}
          </FormHeader>
        </Form>
      </FormWrapper>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
          <FormHeader>{formData._id ? "Editar Elemento" : "Añadir Elemento"}</FormHeader>
          <Label htmlFor="valor">Valor:</Label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            min="0"
            max="3"
            required
          />
          <br />
          <Label htmlFor="observation">Observación:</Label>
          <input
            type="text"
            id="observation"
            name="observation"
            value={formData.observation}
            onChange={handleChange}
          />
          <ButtonContainer>
            <Button type="submit">{formData._id ? "Guardar Cambios" : "Guardar"}</Button>
            <Button type="button" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </ButtonContainer>
        </Form>
      </Modal>
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={() => {
          handleDeleteItem(selectedItemId!);
          handleCloseDeleteModal(); // Close the modal after deleting the item
        }}
      />

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
            <Label htmlFor="Valor">Valor</Label>
          </TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
            <Label htmlFor="Descripcion">Descripción</Label>
          </TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
            <Label htmlFor="acciones">Acciones</Label>
          </TableCell>
        </TableRow>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TableRow key={index}>
              <TableCell style={{ textAlign: "center" }}>
                <Label>{index + 1}</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <Label>{item.item}</Label>
              </TableCell>
              <TableCell>
                <Label>{item.description}</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <Label>{item.valor}</Label>
              </TableCell>
              <TableCell>
                <Label>{item.observation}</Label>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <Button onClick={() => handleEditItem(item)}>Editar</Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} style={{ textAlign: "center" }}>
              No se encontraron atributos.
            </TableCell>
          </TableRow>
        )}
      </Table>
      <FormHeader>
        Total puntos: {totalValor} de {data.length * preguntasPorItem} <br />
        Porcentaje total resultado de calidad en uso: {totalPercentage}%
      </FormHeader>
      <FormHeader>
        Criterios de evaluación: <br /> <br />
        0 No cumple de 0% a un 30% <br />
        1 Cumple de 31% a 50% <br />
        2 Cumple de 51% a 89% <br />
        3 Cumple con o más de 90%
      </FormHeader>
    </>
  );
}

export default EvaluacionForm;
