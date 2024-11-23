import React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import CustomerTable from './AhorroTable';
import ModalComponent from './ModalCom';

const Customers: React.FC = () => {
  const showModal = () => {
    NiceModal.show(ModalComponent);
  };

  return (
    <>
      <h1 className='header-section-create'>
        Registro De Ingresos
        <button className="btn btn-primary" onClick={showModal}>Nuevo Registro</button>
      </h1>
      <hr />
      <CustomerTable />
    </>
  );
};

export default Customers;
