import axios, { AxiosInstance } from "axios";

export const endpoint = "http://localhost:1337/api";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:1337/api/",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
const http = new Http().instance;
export default http;
