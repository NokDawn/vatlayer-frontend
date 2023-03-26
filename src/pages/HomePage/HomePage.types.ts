import * as yup from 'yup';
import { validationSchema } from './schemes/validationSchema';

type FormData = yup.InferType<typeof validationSchema>;

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

export type { FormData, VatLayerData };
