import { Review, ReviewFormData, Token } from "@/data/types";
import http, { coinEndpoint } from "@/utils/http";

export class AuthApi {
  static async login(email:string, password: string) {
    try {
      const res = await http.post("auth/local", {
          identifier: email,
          password
      });
      const data = res.data;
      localStorage.setItem("token", data.jwt)
    } catch (e) {
      throw e;
    }
  }
}
