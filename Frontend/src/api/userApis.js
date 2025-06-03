import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

//-------- register -----
export const registerApi = async (form) => {
  try {
    return await axios.post(`${BASE_URL}/users/register`, form);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Login failed"
    );
  }
};

//-------- login -----
export const loginApi = async (form) => {
  try {
    return await axios.post(`${BASE_URL}/users/login`, form);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Login failed"
    );
  }
};
