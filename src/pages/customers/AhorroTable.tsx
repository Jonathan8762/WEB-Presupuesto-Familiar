import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import ModalComponent from './ModalCom'; // Importa tu componente Modal

interface Ahorro {
  id_ahorro: number;
  descripcion: string;
  fecha: string;
  importe: number;
  individuo_id: number;
}

const AhorroTable = () => {
  // Hooks
  const [ahorros, setAhorros] = useState<Ahorro[]>([]);
  const [selectedAhorro, setSelectedAhorro] = useState<Ahorro | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Cargar los ahorros dentro de useEffect
  useEffect(() => {
    fetchAhorros();
  }, []);

  const fetchAhorros = async () => {
    const response = await axios.get('http://localhost:3000/ahorros');
    setAhorros(response.data);
  };

  const editarAhorro = (ahorro: Ahorro) => () => {
    setSelectedAhorro(ahorro);
    setShowModal(true);
  };

  const eliminarAhorro = (ahorro: Ahorro) => () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/ahorros/${ahorro.id_ahorro}`)
          .then(() => {
            Swal.fire('¡Eliminado!', 'Tu registro ha sido eliminado.', 'success');
            fetchAhorros(); // Refrescar la lista de ahorros
          })
          .catch((error) => {
            console.error('Error eliminando el ahorro:', error);
          });
      }
    });
  };

  // Columnas de la tabla
  const columns = [
    {
      name: 'ID',
      selector: (row: Ahorro) => row.id_ahorro
    },
    {
      name: 'Descripción',
      selector: (row: Ahorro) => row.descripcion
    },
    {
      name: 'Fecha',
      selector: (row: Ahorro) => row.fecha
    },
    {
      name: 'Importe',
      selector: (row: Ahorro) => row.importe
    },
    {
      name: 'Individuo ID',
      selector: (row: Ahorro) => row.individuo_id
    },
    // Botones de acciones
    {
      cell: (row: Ahorro) => (
        <div>
          <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={editarAhorro(row)} className="btn btn-primary">Editar</button>
          <button className="btn btn-danger" onClick={eliminarAhorro(row)}>Eliminar</button>
        </div>
      )
    }
  ];

  return (
    <div className="container my-5">
      <DataTable columns={columns} data={ahorros} />

      {showModal && selectedAhorro && (
        <ModalComponent
          show={showModal}
          ahorro={selectedAhorro}
          onHide={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            fetchAhorros(); // Refrescar la lista de ahorros después de guardar
          }}
        />
      )}
    </div>
  );
};

export default AhorroTable;
