import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

//-- add new platform -----
export const addNewPlateFormAPI = async (form) => {
  try {
    return await axios.post(`${BASE_URL}/platforms`, form);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to add platform"
    );
  }
};

//-- get all platforms by user -----
export const getAllPlateFormAPI = async (userId) => {
  try {
    return await axios.get(`${BASE_URL}/platforms?user=${userId}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch platforms"
    );
  }
};

//-- delete a platform by id -----
export const deletePlateFormAPI = async (id) => {
  try {
    return await axios.delete(`${BASE_URL}/platforms/${id}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete platform"
    );
  }
};
