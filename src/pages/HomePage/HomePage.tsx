import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { VatLayerData } from './HomePage.types';
import { Form } from './components/Form/Form';
import { NipBox } from './components/NipBox/NipBox';

export const HomePage = () => {
  const [vatData, setVatData] = useState<VatLayerData | undefined>(undefined);

  const handleVatData = (data: VatLayerData) => {
    setVatData(data);
  };

  return (
    <div className="App">
      <Form onVatDataChange={handleVatData} />
      <NipBox vatData={vatData} />
      <ToastContainer position="bottom-right" />
    </div>
  );
};
