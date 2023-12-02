import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useEditPassword = ({ token, onSuccess, onError}) => {
  return useMutation({
    mutationFn: (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = axiosInstance.post(`/edit-password`, body, {
        headers,
      })
      return res
    },
    onSuccess,
    onError
  })
}
