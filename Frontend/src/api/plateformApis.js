import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

//-- add new platform -----
export const addNewPlateFormAPI = async (form) => {
  try {
    const response = await axios.post(`${BASE_URL}/platforms`, form);
    return {success: true, data: response.data};
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error?.message || 'Failed to add platform'
    };
  }
};

//-- get all platforms by user -----
export const getAllPlateFormAPI = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/platforms?user=${userId}`);
    return {success: true, data: response.data};
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error?.message || 'Failed to fetch platforms'
    };
  }
};

//-- delete a platform by id -----
export const deletePlateFormAPI = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/platforms/${id}`);
    return {success: true, data: response.data};
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error?.message || 'Failed to delete platform'
    };
  }
};