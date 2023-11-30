import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetInvoice = ({ token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["getInvoiceTable"],
    queryFn: async () => {
      const headers = {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      }; 
      const res = await axiosInstance.get("/invoice/status", { headers });
      return res.data;
    },
    onSuccess,
    onError
  })
}
