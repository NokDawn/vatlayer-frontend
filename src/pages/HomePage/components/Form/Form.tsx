import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData, VatLayerData } from '../../HomePage.types';
import { useBuildUrlQuery } from '../../hooks/useBuildUrlQuery';
import { validationSchema } from '../../schemes/validationSchema';
import axios from 'axios';
import { toast } from 'react-toastify';
import { VAT_LAYER_LOCAL_STORAGE_PREFIX } from '../../constants';

type FormProps = {
  onVatDataChange: (data: VatLayerData) => void;
};

export const Form: FC<FormProps> = ({ onVatDataChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const { buildUrlQuery } = useBuildUrlQuery();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const url = buildUrlQuery(data.nip);

    try {
      const { data } = await axios.post<VatLayerData>(url);
      onVatDataChange(data);
      const storedData = JSON.parse(
        localStorage.getItem(VAT_LAYER_LOCAL_STORAGE_PREFIX)
      );
      localStorage.setItem(VAT_LAYER_LOCAL_STORAGE_PREFIX, data.vat_number);
      successNotification();
    } catch (error) {
      errorNotification();
    }
    setIsLoading(false);
  };

  const isNipError = errors.nip;

  const errorNotification = () =>
    toast.error('Wystąpił jakiś nieczekiwany błąd!');
  const successNotification = () => {
    toast.success('Dane zostały pobrane pomyślnie!');
  };

  return (
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
  );
};
