/* This TypeScript code snippet is importing the Axios library and creating an Axios instance named
`axiosService`. The `axios.create()` method is used to create a new Axios instance with custom
configuration options. In this case, the Axios instance is configured with a base URL of
"http://localhost:5000/api", default headers including "Access-Control-Allow-Origin" set to "*", and
"Content-Type" set to "application/json". */
import axios from "axios";

export const axiosService = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});
