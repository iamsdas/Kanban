const API_BASE_URL = `${
  import.meta.env.VITE_BACKEND_URL ?? 'http://127.0.0.1:8000'
}/api`;

export const request = async <T>(
  endpoint: string,
  method: string = 'GET',
  data: any = null
): Promise<T> => {
  let payload: string;
  let url: string;
  const token = localStorage.getItem('token');
  const auth = 'Token ' + localStorage.getItem('token') ?? '';
  const headers = new Headers();
  if (token) headers.append('Authorization', auth);

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
    if (!(data instanceof FormData)) {
      headers.append('Content-Type', 'application/json');
      if (payload) payload = JSON.stringify(payload);
    }
    url = `${API_BASE_URL}/${endpoint}/`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: method !== 'GET' ? payload : null,
  });

  const json = await response.json();

  if (response.ok) return await json;
  else throw new Error(JSON.stringify(json));
};
