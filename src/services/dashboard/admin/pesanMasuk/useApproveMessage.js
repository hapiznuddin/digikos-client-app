import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useApproveMessage = ({ token, onSuccess, onError}) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.post(`/admin/message/approve`, body, {headers,});
      return res.data;
    },
    onSuccess,
    onError
  })
}
