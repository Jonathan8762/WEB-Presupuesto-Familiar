import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  ahorro: any;
  onSave: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ show, onHide, ahorro, onSave }) => {
  const [ahorroData, setAhorroData] = useState({
    descripcion: '',
    fecha: '',
    importe: 0,
    individuo_id: 0,
  });

  useEffect(() => {
    if (ahorro) {
      setAhorroData(ahorro);
    }
  }, [ahorro]);

  const handleSave = async () => {
    try {
      if (ahorro) {
        // Update existing ahorro
        await axios.put(`http://localhost:3000/ahorros/${ahorro.id_ahorro}`, ahorroData);
      } else {
        // Create new ahorro
        await axios.post('http://localhost:3000/ahorros', ahorroData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving ahorro:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{ahorro ? 'Modificar Ahorro' : 'Añadir Nuevo Ahorro'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción"
              value={ahorroData.descripcion}
              onChange={(e) => setAhorroData({ ...ahorroData, descripcion: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formFecha" className="mt-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={ahorroData.fecha}
              onChange={(e) => setAhorroData({ ...ahorroData, fecha: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formImporte" className="mt-3">
            <Form.Label>Importe</Form.Label>
            <Form.Control
              type="number"
              placeholder="Importe"
              value={ahorroData.importe}
              onChange={(e) => setAhorroData({ ...ahorroData, importe: parseFloat(e.target.value) })}
            />
          </Form.Group>
          <Form.Group controlId="formIndividuoId" className="mt-3">
            <Form.Label>Individuo ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Individuo ID"
              value={ahorroData.individuo_id}
              onChange={(e) => setAhorroData({ ...ahorroData, individuo_id: parseInt(e.target.value) })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
