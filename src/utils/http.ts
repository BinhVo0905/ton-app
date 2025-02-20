import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token") || ""
    }
    this.instance = axios.create({
      baseURL: "https://whimsical-renewal-be49f9c7e3.strapiapp.com/api/",
      // timeout: 10000,
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
      },
    });
  }
}
const http = new Http().instance;
export default http;
export const coinEndpoint = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
   
  },
});