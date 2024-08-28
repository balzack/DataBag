import axios from 'redaxios';

export async function setAccountSearchable(node: string, secure: boolean, token: string, flag: boolean) {
  const endpoint = `http${secure ? 's' : ''}://${node}/account/searchable?agent=${token}`;
  const response = await axios.put(endpoint, flag);
  if (response.status >= 400 && response.status < 600) {
    throw new Error('setAccountSearchable failed');
  }
}

