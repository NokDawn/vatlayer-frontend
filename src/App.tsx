import './App.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  nip: yup.number().min(1000000000).max(9999999999).required(),
});

type FormData = yup.InferType<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => console.log(data);

  console.log(watch('nip'));

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="nip" className="label">
            <span className="label-text">Numer NIP</span>
          </label>
          <input
            id="nip"
            type="text"
            placeholder="Type here"
            className={`input input-bordered w-full max-w-xs mb-2 ${
              errors.nip && 'input-error'
            }`}
            {...register('nip')}
          />
          <button className="btn btn-primary">Pobierz dane</button>
        </div>
      </form>
    </div>
  );
}

export default App;
