import { axios } from './axios.util';

const baseUrl = '';
export const request = async ({
  url = '',
  method = 'get',
  params = {},
  data,
  headers = {},
  ...props
}) => {
  const fixedParams = Object.keys(params).reduce((obj, key) => {
    if (params[key] !== undefined) {
      obj[key] = params[key];
    }
    return obj;
  }, {});
  try {
    const result = await axios({
      url: `${baseUrl}${url}`,
      method,
      data,
      params: fixedParams,
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        ...headers,
      },
      ...props,
    });
    return result;
  } catch (err) {
    throw err;
  }
};
