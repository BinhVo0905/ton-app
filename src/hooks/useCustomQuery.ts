import { BaseData, ObjectResponse } from "@/data/types";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
export type TypeKeys = "categories" | "applications" | "reviews" |"blogs";
export interface OptionQueryProps<T> {
  id?: number;
  populates?: (keyof T)[];
}
export const useCustomQuery = <T extends BaseData>({
  key,
  id,
  urlParamsObject,
}: {
  key: TypeKeys;
  id?: number;
  urlParamsObject?: {};
}) => {
  const query = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true,
  });
  const { data, isLoading } = useQuery({
    queryKey: [key, urlParamsObject],
    queryFn: async () => {
      try {
        const res = await http.get<ObjectResponse<T>>(
          `/${key}${id ? `/${id}` : ""}${query ? `?${query}` : ""}`
        );
        const { data } = res.data;
        if (!Array.isArray(data)) {
          return {
            id: data.id,
            ...data.attributes,
          } as T;
        }
        return data.map((item) => {
          return {
            id: item.id,
            ...item.attributes,
          } as T;
        });
      } catch (e) {
        throw e;
      }
    },
  });
  return { data, isLoading };
};
