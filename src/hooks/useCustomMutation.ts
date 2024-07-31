import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TypeKeys } from "./useCustomQuery";
import http from "@/utils/http";
interface MutationProps {
  key: TypeKeys;
  queryKey?: TypeKeys;
  type: "create" | "update" | "delete";
  id?: number;
  handleSuccess?: () => void;
}
export const useCustomMutation = ({
  key,
  id,
  type,
  queryKey,
  handleSuccess
}: MutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      switch (type) {
        case "create":
          return http.post(`/${key}`, data);
        case "update":
          return http.put(`/${key}/${id}`, data);
        case "delete":
          return http.delete(`/${key}/${id}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey || key] });

    },
  });
};
