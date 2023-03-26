import { FC } from 'react';
import { VatLayerData } from '../../HomePage.types';

type NipBoxProps = {
  vatData?: VatLayerData;
};

export const NipBox: FC<NipBoxProps> = ({ vatData }) => {
  if (!vatData || !vatData.valid) return null;

  if (vatData && !vatData.valid) {
    return <NipNotValidBox />;
  }

  return (
    <div className="stats shadow mt-4">
      <div className="stat">
        <div className="stat-title">{vatData.company_name}</div>
        <div className="stat-value">{vatData.vat_number}</div>
        <div className="stat-desc">{vatData.company_address}</div>
      </div>
    </div>
  );
};

const NipNotValidBox = () => {
  return (
    <div className="stats shadow mt-4">
      <div className="stat">
        <div className="stat-title">Dany numer NIP nie jest płatnikiem VAT</div>
      </div>
    </div>
  );
};
