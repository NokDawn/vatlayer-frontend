import { POLISH_COUNTRY_CODE, VAT_LAYER_API_URL } from '../constants';

export const useBuildUrlQuery = () => {
  const buildUrlQuery = (nip: number) => {
    const query = new URLSearchParams({
      access_key: import.meta.env.VITE_VATLAYER_API,
      country_code: POLISH_COUNTRY_CODE,
      vat_number: `${POLISH_COUNTRY_CODE}${nip}`,
    }).toString();
    return VAT_LAYER_API_URL + query;
  };

  return { buildUrlQuery };
};
