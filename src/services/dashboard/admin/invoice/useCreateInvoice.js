import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useCreateInvoice = ({ token, onSuccess, onError}) => {
  return useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.post("/invoice", body, { headers });
      return res;
    },
    onSuccess,
    onError
  })
}
