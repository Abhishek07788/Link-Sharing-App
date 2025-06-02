import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

//-------- register -----
export const registerApi = (form) => {
  return axios.post(`${BASE_URL}/users/register`, form);
};