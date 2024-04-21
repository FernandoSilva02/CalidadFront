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
  _id: string;
  item: string;
  description: string;
  preguntas: number;
  total: number;
  atributosCount?: number;
  porcentaje?: number; // Ensure this is always set in fetchData()
}

function MainMenu() {
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
          <FormHeader>PARÁMETROS</FormHeader>
          <FormHeader>
            Seleccione los porcentajes según el criterio de evaluación que desea aplicar
            correspondiente al software a evaluar. Ejemplo: Para Software Bancario tendría mayor
            peso en los indicadores siguientes: FUNCIONALIDAD Y EFICIENCIA. Para un Software de
            Capacitación o académico en los indicadores siguientes: USABILIDAD, CALIDAD EN USO Y
            PORTABILIDAD. Estos valores se pueden cambiar según el criterio de los evaluadores.
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
              <Link to={`/${item._id}`} style={{ display: "flex", justifyContent: "center" }}>
                <Button>{item.item}</Button>
              </Link>
            </TableCell>
            <TableCell>
              <Label>{item.description}</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Label>{item.atributosCount !== undefined ? item.atributosCount : 0}</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Label>{item.porcentaje !== undefined ? item.porcentaje.toFixed(2) : "0.00"}%</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Button onClick={() => handleEditItem(item)}>Editar</Button>
              <Button onClick={() => handleOpenDeleteModal(item._id)}>Eliminar</Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <FormHeader>
      Total puntos: {totalAtributosCount} <br />
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
