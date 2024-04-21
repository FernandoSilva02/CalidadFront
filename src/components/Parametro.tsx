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

function Parametro() {
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
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();

    fetch(`http://localhost:3230/api/parametro/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setParametroData(data);
      })
      .catch((error) => {
        console.error("Error fetching parametro data:", error);
        setParametroData({
          item: "Error",
          description: "No se pudo cargar los datos del parámetro.",
        });
      });
  }, [id]);

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
    setFormData({ _id: "", item: "", description: "", valor: 0, observation: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "valor" || name === "observation" ? parseInt(value) : value,
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
          <ButtonContainer>
            <Button type="button" onClick={handleOpenModal}>
              Añadir Elemento
            </Button>
          </ButtonContainer>
        </Form>
      </FormWrapper>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
          <FormHeader>{formData._id ? "Editar Elemento" : "Añadir Elemento"}</FormHeader>
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
                <Button onClick={() => handleEditItem(item)}>Editar</Button>
                <Button onClick={() => handleOpenDeleteModal(item._id)}>Eliminar</Button>
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
    </>
  );
}

export default Parametro;
