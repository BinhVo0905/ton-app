import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://whimsical-renewal-be49f9c7e3.strapiapp.com/api/",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
const http = new Http().instance;
export default http;
