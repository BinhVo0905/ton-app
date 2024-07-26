import { Route } from "@/routers/types";
import { RootNode } from "@strapi/blocks-react-renderer/dist/BlocksRenderer";
import { extend } from "lodash";
import { StaticImageData } from "next/image";
import { StringLiteral } from "typescript";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType extends BaseData {
  // id: string | number;
  name: string;
  href: Route;
  count?: number;
  thumbnail?: string | StaticImageData;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
}

export interface PostAuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: Route;
}

export interface PostDataType {
  id: string | number;
  author: PostAuthorType;
  date: string;
  href: Route;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string | StaticImageData;
  desc?: string;
  like: {
    count: number;
    isLiked: boolean;
  };
  bookmark: {
    count: number;
    isBookmarked: boolean;
  };
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string | string[];
  galleryImgs?: string[];
}
export interface BaseData {
  id: number;
}
export type MediaData = {
  attributes: {
    url: string;
  };
};
//user
export interface User extends BaseData {
  username: string;
  email: string;
}
//category
export interface Category extends BaseData {
  name: string;
  description: string;
  subTitle: string;
  images: {
    data: MediaData[];
  };
  href: Route;
  icon: {
    data: MediaData;
  };
  applications: {
    data: DataResponse<Application>[];
  };
  featuredApp: {
    data: DataResponse<Application>[];
  };
}

//application
export interface Application extends TaxonomyType {
  subTitle: string;
  description: string;
  logo: {
    data: MediaData;
  };
  developers: string;
  sliderImages: {
    data: MediaData[];
  };
  rating: number;
  category: Category;
  href: Route;
  reviews: {
    data: DataResponse<Review>[];
  };
}
//blog
export interface Blog extends BaseData {
  name: string;
  description?: String;
  featuredImage: {
    data: MediaData;
  }
  content: RootNode[];

}
//review
export interface Review extends BaseData {
  content: string;
  rating: number;
  application: {
    data: DataResponse<Application>;
  };
  author: {
    data: DataResponse<User>;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}
export type ReviewFormData = {
  content: Review["content"];
  application: number;
  author: number;
  rating?: number;
}
interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface DataResponse<T extends BaseData> {
  id: T["id"];
  attributes: Omit<T, "id">;
}
export interface PopulateResponse<T extends BaseData> {
  data: DataResponse<T>[] | DataResponse<T>;
}
export interface ObjectResponse<T extends BaseData> {
  data: DataResponse<T>[] | DataResponse<T>;
  meta?: Pagination;
}
export interface MediaProps {}
export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";
