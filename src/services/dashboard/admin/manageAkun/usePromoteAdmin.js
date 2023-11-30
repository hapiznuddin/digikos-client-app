import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const usePromoteAdmin = ({ token, onSuccess, onError}) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.put(`/management-user/promote?user_id=${body}`, null, { headers });
      return res;
    },
    onSuccess,
    onError
  })
}
