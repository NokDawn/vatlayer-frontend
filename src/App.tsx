import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useState } from 'react';

const schema = yup.object({
  nip: yup
    .number()
    .min(1000000000, 'Numer NIP musi mieć 10 cyfr')
    .max(9999999999, 'Numer NIP musi mieć 10 cyfr')
    .typeError('Numer NIP musi być liczbą')
    .required('Numer NIP jest wymagany'),
});

const POLISH_COUNTRY_CODE = 'PL';
const VAT_LAYER_API_URL = 'http://apilayer.net/api/validate?';

type FormData = yup.InferType<typeof schema>;

type VatLayerData = {
  company_address: string;
  company_name: string;
  country_code: string;
  database: string;
  format_valid: boolean;
  query: string;
  valid: boolean;
  vat_number: string;
};

function App() {
  const [vatData, setVatData] = useState<VatLayerData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  console.log({ vatData });

  const buildUrlQuery = (nip: number) => {
    const query = new URLSearchParams({
      access_key: import.meta.env.VITE_VATLAYER_API,
      country_code: POLISH_COUNTRY_CODE,
      vat_number: `${POLISH_COUNTRY_CODE}${nip}`,
    }).toString();
    return VAT_LAYER_API_URL + query;
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const url = buildUrlQuery(data.nip);

    try {
      const { data } = await axios.post<VatLayerData>(url);
      setVatData(data);
      successNotification();
    } catch (error) {
      errorNotification();
    }
    setIsLoading(false);
  };

  const errorNotification = () =>
    toast.error('Wystąpił jakiś nieczekiwany błąd!');
  const successNotification = () => {
    toast.success('Dane zostały pobrane pomyślnie!');
  };

  const isNipError = errors.nip;

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="nip" className="label">
            <span className="label-text">Podaj numer NIP</span>
          </label>
          <input
            id="nip"
            type="number"
            placeholder="np. 1234567890"
            className={`input input-bordered w-full max-w-xs ${
              isNipError && 'input-error'
            }`}
            onKeyDown={e => {
              if (e.key === '-' || e.key === '+') {
                e.preventDefault();
              }
            }}
            {...register('nip')}
          />
          {isNipError && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors.nip?.message || 'Błąd'}
              </span>
            </label>
          )}
          <button className={`btn btn-primary mt-2 ${isLoading && 'loading'}`}>
            Pobierz dane
          </button>
        </div>
      </form>
      {vatData?.valid && (
        <div className="stats shadow mt-4">
          <div className="stat">
            <div className="stat-title">{vatData.company_name}</div>
            <div className="stat-value">{vatData.vat_number}</div>
            <div className="stat-desc">{vatData.company_address}</div>
          </div>
        </div>
      )}
      {vatData && !vatData?.valid && (
        <div className="stats shadow mt-4">
          <div className="stat">
            <div className="stat-title">
              Dany numer NIP nie jest płatnikiem VAT
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
