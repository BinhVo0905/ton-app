import { BaseData, DataResponse } from "@/data/types";
export const retrieveDataFromResponse = <T extends BaseData>(
  data: DataResponse<T>[]
): T[] => {
    console.log(data);
  return data.map(
    (item) =>
      ({
        id: item.id,
        ...item.attributes,
      } as T)
  );
};
