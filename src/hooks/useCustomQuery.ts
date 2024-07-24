import { BaseData, ObjectResponse } from "@/data/types";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
export type TypeKeys = "categories" | "applications" | "reviews";
export interface OptionQueryProps<T> {
  id?: number;
  populates?: (keyof T)[];
}
export const useCustomQuery = <T extends BaseData>({
  key,
  opts

}: {
  key: TypeKeys;
  opts?: OptionQueryProps<T>;
}) => {
  const query = qs.stringify(
    {
      populate: opts?.populates
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      try {
        const res = await http.get<ObjectResponse<T>>(`/${key}?${query}`);
        const { data, meta } = res.data;
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
  return { data };
};
