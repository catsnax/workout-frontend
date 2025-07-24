import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteRequest<T>(
  url: string,
  invalidateKey?: string[]
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: T) => axios.delete(url, { data: payload }),
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
  });
}
