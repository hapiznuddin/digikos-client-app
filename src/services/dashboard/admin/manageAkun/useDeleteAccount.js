import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useDeleteAccount = ({ token, onSuccess, onError}) => {
  return useMutation({
    mutationFn: async (body) => {
      const config = {
        headers : {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: null
      }
      const res = await axiosInstance.delete(`/management-user/delete?user_id=${body}`, config);
      return res;
    },
    onSuccess,
    onError
  })
}
