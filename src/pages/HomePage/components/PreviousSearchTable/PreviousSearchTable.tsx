import { useEffect, useState } from 'react';
import { VAT_LAYER_LOCAL_STORAGE_PREFIX } from '../../constants';
import { VatLayerData } from '../../HomePage.types';

export const PreviousSearchTable = () => {
  const [tableData, setTableData] = useState<VatLayerData[]>([]);
  const storedData = localStorage.getItem(VAT_LAYER_LOCAL_STORAGE_PREFIX);

  useEffect(() => {
    if (storedData) {
      const storedDataArray = JSON.parse(storedData);
      setTableData(storedDataArray);
    }
  }, [storedData]);

  if (!tableData.length) return null;

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="mb-2">Ostatnio wyszukiwane</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Nazwa spółki</th>
            <th>Adres spółki</th>
            <th>Numer NIP</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(
            ({ company_address, company_name, vat_number, valid }, index) => (
              <tr key={vat_number}>
                <th>{index + 1}</th>
                <td>{company_name || '-'}</td>
                <td>{company_address || '-'}</td>
                <td>{vat_number}</td>
                <td>
                  {valid ? (
                    <div className="badge badge-success gap-2">Sukces</div>
                  ) : (
                    <div className="badge badge-error gap-2">Błąd</div>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
