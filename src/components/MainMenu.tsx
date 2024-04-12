import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  id: number;
  item: string;
  description: string;
  preguntas: number;
  total: number;
}

function MainMenu() {
  const [data, setData] = useState<DataItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState<DataItem>({
    id: 0,
    item: "",
    description: "",
    preguntas: 0,
    total: 0,
  });
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3230/api/parametro")
      .then((response) => response.json())
      .then((data: DataItem[]) => {
        console.log("Datos recibidos del servidor:", data);
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: 0, item: "", description: "", preguntas: 0, total: 0 });
  };

  const handleOpenDeleteModal = (id: number) => {
    setSelectedItemId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItemId(null);
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

  const handleDeleteItem = () => {
    if (selectedItemId) {
      fetch(`http://localhost:3230/api/parametro/${selectedItemId}`, {
        method: "DELETE",
      })
        .then(() => {
          setData((prevData) => prevData.filter((item) => item.id !== selectedItemId));
          handleCloseDeleteModal();
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = formData.id
      ? `http://localhost:3230/api/parametro/${formData.id}`
      : "http://localhost:3230/api/parametro";
    const method = formData.id ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newDataItem) => {
        if (formData.id) {
          setData((prevData) =>
            prevData.map((item) => (item.id === formData.id ? newDataItem : item))
          );
        } else {
          setData((prevData) => [...prevData, newDataItem]);
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
          <FormHeader>PARÁMETROS</FormHeader>
          <FormHeader>
            Seleccione los porcentajes según el criterio de evaluación que desea aplicar
            correspondiente a el software a evaluar Ejemplo Para Software Bancario tendría mayor
            peso en los indicadores siguientes FUNCIONALIDAD Y EFICIENCIA Para un Software de
            Capacitación o académico en los indicadores siguientes USABILIDAD, CALIDA EN USO Y
            PORTABILIDAD Estos valores se pueden cambiar según el criterio de los evaluadores
          </FormHeader>
          <ButtonContainer>
            <Button type="button" onClick={handleOpenModal}>
              Añadir Elemento
            </Button>
          </ButtonContainer>
        </Form>
      </FormWrapper>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
          <FormHeader>{formData.id ? "Editar Elemento" : "Añadir Elemento"}</FormHeader>
          <Label htmlFor="item">Item:</Label>
          <input
            type="text"
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
          />
          <Label htmlFor="description">Descripción:</Label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <ButtonContainer>
            <Button type="submit">{formData.id ? "Guardar Cambios" : "Guardar"}</Button>
            <Button type="button" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </ButtonContainer>
        </Form>
      </Modal>
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteItem}
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
            <Label htmlFor="preguntas">Preguntas</Label>
          </TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
            <Label htmlFor="total">% Total</Label>
          </TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
            <Label htmlFor="acciones">Acciones</Label>
          </TableCell>
        </TableRow>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell style={{ textAlign: "center" }}>
              <Label>{index + 1}</Label>
            </TableCell>
            <TableCell>
              <Label>{item.item}</Label>
            </TableCell>
            <TableCell>
              <Label>{item.description}</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Label>{item.preguntas !== undefined ? item.preguntas : 0}</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Label>{item.total !== undefined ? item.total : 0}</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Button onClick={() => handleEditItem(item)}>Editar</Button>
              <Button onClick={() => handleOpenDeleteModal(item.id)}>Eliminar</Button>
            </TableCell>
          </TableRow>
        ))}
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
    </>
  );
}

export default MainMenu;
