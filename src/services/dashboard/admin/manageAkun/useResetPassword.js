import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useResetPassword = ({ token, onSuccess, onError}) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.post(`/reset-password?user_id=${body}`, null, { headers });
      return res;
    },
    onSuccess,
    onError
  })
}
