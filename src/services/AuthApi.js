import axios from "axios";

export const LoginApi = (data, headers, callback) => {
  axios
    .post(`${import.meta.env.VITE_DIGIKOS_API_URL}/login`, data, headers)
    .then((response) => {
      callback(true, response.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};
