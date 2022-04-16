const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const request = async (
  endpoint: string,
  method: string = 'GET',
  data: any = null
) => {
  let payload: string;
  let url: string;
  const token = localStorage.getItem('token');
  const auth = token ? 'Token ' + localStorage.getItem('token') : '';

  if (method === 'GET') {
    const reqParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join('&')}`
      : '';
    payload = '';
    url = `${API_BASE_URL}/${endpoint}/${reqParams}`;
  } else {
    payload = data ?? '';
    url = `${API_BASE_URL}/${endpoint}/`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: method !== 'GET' ? payload : null,
  });

  const json = await response.json();
  if (response.ok) return await json;
  else throw Error(json);
};
