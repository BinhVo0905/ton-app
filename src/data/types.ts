import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

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
//category
export interface Category extends BaseData {
  name: string;
  description: string;
  subTitle: string;
  images?: string[];
  href: Route;
  icon: string;
  applications: PopulateResponse<Application>;
}
//application
export interface Application extends TaxonomyType {
  subTitle: string;
  description: string;
  logo: string;
  developers: string;
  sliderImages: string[];
  rating: number;
  category: Category;
  href: Route;
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
  data: DataResponse<T>[];
}
export interface ObjectResponse<T extends BaseData> {
  data: DataResponse<T>[];
  meta?: Pagination;
}
export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";
