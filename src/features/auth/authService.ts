import axios from 'axios';

export const loginApi = (data: any) => {
  return axios.post('https://dummyjson.com/auth/login', data);
};
