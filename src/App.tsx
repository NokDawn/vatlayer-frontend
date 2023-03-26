import './App.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  nip: yup
    .number()
    .min(1000000000, 'Numer NIP musi mieć 10 cyfr')
    .max(9999999999, 'Numer NIP musi mieć 10 cyfr')
    .typeError('Numer NIP musi być liczbą')
    .required('Numer NIP jest wymagany'),
});

type FormData = yup.InferType<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
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
          <button className="btn btn-primary mt-2">Pobierz dane</button>
        </div>
      </form>
    </div>
  );
}

export default App;
