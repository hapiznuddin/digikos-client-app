import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useLoginUser = ({onSuccess, onError}) => {
  return useMutation({
    mutationFn: async (body, headers) => {
      const loginUser = await axiosInstance.post("/login", body, headers);
      return loginUser.data;
    },
    onSuccess,
    onError
  });
}