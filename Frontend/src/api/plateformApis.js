import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

//---- add new -----
export const addNewPlateFormAPI = (form) => {
  return axios.post(`${BASE_URL}/platforms`, form);
};

//----- get all platforms by user -----
export const getAllPlateFormAPI = (userId) => {
  return axios.get(`${BASE_URL}/platforms?user=${userId}`);
};

//---- update a platform by id -----
export const updatePlateFormAPI = (id, form) => {
  return axios.put(`${BASE_URL}/platforms/${id}`, form);
};

//------ delete a platform by id -----
export const deletePlateFormAPI = (id) => {
  return axios.delete(`${BASE_URL}/platforms/${id}`);
};