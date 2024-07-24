import { Category } from "@/data/types";
import http from "@/utils/http";
import axios from "axios";

export class CategoriesApi {
  static async getCategories() {
    const res = await http.get<Category[]>("categories");
    return res.data;
  }
  
}
