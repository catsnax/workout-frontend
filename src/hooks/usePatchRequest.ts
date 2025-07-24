import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function usePatchRequest<T>(
  url: string,
  invalidateKey?: string[]
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: T) => axios.patch(url, payload),
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
  });
}
