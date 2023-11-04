import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useAddTipekamar = ({ token, onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const req = await axiosInstance.post(`/class-room`, body, {headers: headers});
      return req;
    },
    onSuccess,
    onError
  })
}
