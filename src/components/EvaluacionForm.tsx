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
  const [totalValor, setTotalValor] = useState<number>(0);
  const [totalPercentage, setTotalPercentage] = useState<number>(0);
  const preguntasPorItem = 3;

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

  useEffect(() => {
    const sum = data.reduce((total, item) => total + item.valor, 0);
    setTotalValor(sum);
    const totalPoints = sum / preguntasPorItem;
    const percentage = ((sum / (data.length * preguntasPorItem)) * 100).toFixed(2);
    setTotalPercentage(parseFloat(percentage));
  }, [data, preguntasPorItem]);

  const fetchData = () => {
    fetch(`http://localhost:3230/api/atributos/?parametro=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos del servidor:", data);
        setData(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, itemId: string) => {
    const { name, value } = e.target;
    setData((prevData) =>
      prevData.map((item) =>
        item._id === itemId
          ? { ...item, [name]: name === "valor" ? parseInt(value) : value }
          : item
      )
    );
  };

  const handleSaveChanges = () => {
    data.forEach((item) => {
      fetch(`http://localhost:3230/api/atributos/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          console.log("Item guardado exitosamente:", item);
        })
        .catch((error) => {
          console.error("Error saving item:", error);
        });
    });

    fetch(`http://localhost:3230/api/parametro/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: totalValor,
        percentage: totalPercentage,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Cambios guardados exitosamente.");
        } else {
          console.error("Error al guardar los cambios:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error al guardar los cambios:", error);
      });
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
      <ButtonContainer>
        <Link to="/evaluacion">
          <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
        </Link>
      </ButtonContainer>

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
        </TableRow>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TableRow key={item._id}>
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
                <input
                  type="number"
                  id="valor"
                  name="valor"
                  value={item.valor}
                  onChange={(e) => handleChange(e, item._id)}
                  min="0"
                  max="3"
                  required
                />
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <textarea
                  id="observation"
                  name="observation"
                  value={item.observation}
                  onChange={(e) => handleChange(e, item._id)}
                  rows={4} // You can adjust the number of rows to make it larger
                  cols={50} // You can adjust the number of columns to make it larger
                />
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
        Porcentaje total: {totalPercentage}%
      </FormHeader>
      <FormHeader>
        Criterios de evaluación: <br /> <br />
        0 No cumple de 0% a un 30% <br />
        1 Cumple de 31% a 50% <br />
        2 Cumple de 51% a 89% <br />3 Cumple con o más de 90%
      </FormHeader>
    </>
  );
}

export default EvaluacionForm;
