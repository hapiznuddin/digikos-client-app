import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetHistoryPayment = ({ token, idOccupant, onSuccess, onError, userOccupant}) => {
  return useQuery({
    queryKey: ["tableHistoryPayment", idOccupant, userOccupant],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/payment-history?id=${idOccupant}&user_id=${userOccupant}`, { headers: headers });
      return res;
    },
    onSuccess,
    onError
  })

}
