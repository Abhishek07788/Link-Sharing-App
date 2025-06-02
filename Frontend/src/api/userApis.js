import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

//-------- register -----
export const registerApiCall = (form) => {
  return axios.post(`${BASE_URL}/users/register`, form);
};

//----- get a user ------
export const getUserApi = (username) => {
  return axios.get(`${BASE_URL}/users/${username}`);
};