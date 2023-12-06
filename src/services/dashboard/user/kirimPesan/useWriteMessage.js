import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useWriteMessage = ({ onSuccess, onError, token }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.post(`/user/message`, body, { headers });
      return res.data;
    },
    onSuccess,
    onError
  });
}
