import { Review, ReviewFormData, Token } from "@/data/types";
import http, { coinEndpoint } from "@/utils/http";

export class TokensApi {
  static async getListTokens(perPage: number) {
    try {
      const res = await coinEndpoint.get("coins/markets", {
        params: {
          vs_currency: "usd",
          price_change_percentage: "1h,24h,7d",
          per_page: perPage,
        },
      });
      return res.data as Token[];
    } catch (e) {
      throw e;
    }
  }
  static async getTrendTokens() {
    try {
      const res = await coinEndpoint.get("search/trending");
      return res.data.coins as Token[];
    } catch (e) {
      throw e;
    }
  }
  static async getById(id: string) {
    try {
      const res = await coinEndpoint.get(`coins/${id}`);
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}
