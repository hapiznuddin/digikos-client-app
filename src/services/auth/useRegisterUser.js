import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useRegisteruser = ({onSuccess, onError}) => {
  return useMutation({
    mutationFn: async (body, headers) => {
      const registerUser = await axiosInstance.post("/register", body, headers);
      return registerUser.data;
    },
    onSuccess,
    onError
  });
}