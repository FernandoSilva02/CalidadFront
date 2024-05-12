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
  valor: number;
  percentage: number;
  preguntas: number;
  total: number;
  atributosCount?: number;
  porcentaje?: number; // Ensure this is always set in fetchData()
}



function Total() {
  const [data, setData] = useState<DataItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState<DataItem>({
    _id: "",
    item: "",
    description: "",
    valor: 0,
    percentage: 0,
    preguntas: 0,
    total: 0,
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [totalPercentage, setTotalPercentage] = useState<number>(0); // State for total percentage

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

          // Calculate total percentage
          const totalPercentage = dataWithAtributosCount.reduce((acc, item) => {
            return acc + (((item.porcentaje ?? 0) * item.percentage) / 100);
          }, 0);
          setTotalPercentage(totalPercentage);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ _id: "", item: "", description: "", preguntas: 0, total: 0, valor: 0, percentage: 0 });
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
  const totalValor = data.reduce((acc, item) => acc + item.valor, 0);
  


  return (
    <>
      <FormWrapper>
        <Form>
          <FormHeader>RESULTADOS</FormHeader>
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
            <Label htmlFor="valor">Valor</Label>
          </TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
            <Label htmlFor="maximo1">Máximo</Label>
          </TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
            <Label htmlFor="resultado">% Resultado</Label>
          </TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
            <Label htmlFor="maximo2">Máximo</Label>
          </TableCell>
          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
            <Label htmlFor="global">% Global</Label>
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
              <Label>{item.valor}</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Label>{item.atributosCount !== undefined ? item.atributosCount * 3 : 0}</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Label>{item.percentage}%</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Label>{item.porcentaje !== undefined ? item.porcentaje.toFixed(2) : "0.00"}%</Label>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Label>{(((item.porcentaje ?? 0) * item.percentage) / 100).toFixed(2)}%</Label>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <FormHeader>
        Total puntos: {totalValor} de {totalAtributosCount * 3} <br />
        Porcentaje total: {totalPercentage.toFixed(2)}%
      </FormHeader>
      <FormHeader>
        Resultados del ejercicio: <br /> <br />
        0 a 30% DEFICIENTE <br />
        31 A 50% INSUFICIENTE <br />
        51 A 70% ACEPTABLE <br />
        71 A 89% SOBRESALIENTE <br />
        MÁS DE 90% EXCELENTE
      </FormHeader>
    </>
  );
}

export default Total;
