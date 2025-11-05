import axios from "axios";

export const api = axios.create({
  baseURL: "https://ty0quyvzq1.execute-api.us-east-2.amazonaws.com",
  timeout: 10000,
  // headers: { "X-Custom-Header": "foobar" },
});