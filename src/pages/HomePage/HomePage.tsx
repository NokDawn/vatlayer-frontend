import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { VatLayerData } from './HomePage.types';
import { Form } from './components/Form/Form';
import { NipBox } from './components/NipBox/NipBox';
import { PreviousSearchTable } from './components/PreviousSearchTable/PreviousSearchTable';

export const HomePage = () => {
  const [vatData, setVatData] = useState<VatLayerData | undefined>(undefined);

  const handleVatData = (data: VatLayerData) => {
    setVatData(data);
  };

  return (
    <div className="flex flex-col items-center">
      <Form onVatDataChange={handleVatData} />
      <NipBox vatData={vatData} />
      <PreviousSearchTable />
      <ToastContainer position="bottom-right" />
    </div>
  );
};
