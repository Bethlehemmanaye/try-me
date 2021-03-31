import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error); // log error
    toast.error("An unexpected error occurred."); //display a genereic message
  }
  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  setJwt,
};
