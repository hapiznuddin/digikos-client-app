import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetHistoryPayment = ({ token, idOccupant, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["tableHistoryPayment"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/payment-history?id=${idOccupant}`, { headers: headers });
      return res;
    },
    onSuccess,
    onError
  })

}
