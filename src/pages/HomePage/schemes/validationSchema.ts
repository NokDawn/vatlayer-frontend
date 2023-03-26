import * as yup from 'yup';

export const validationSchema = yup.object({
  nip: yup
    .number()
    .min(1000000000, 'Numer NIP musi mieć 10 cyfr')
    .max(9999999999, 'Numer NIP musi mieć 10 cyfr')
    .typeError('Numer NIP musi być liczbą')
    .required('Numer NIP jest wymagany'),
});
