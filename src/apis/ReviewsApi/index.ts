
import { Review, ReviewFormData } from "@/data/types";
import http from "@/utils/http";

export class ReviewsApi {
  static createReview(data: ReviewFormData) {
    return http.post("reviews", data);
  }
  static async updateReview() {
    await http.post<Review[]>("categories");
  }
}
