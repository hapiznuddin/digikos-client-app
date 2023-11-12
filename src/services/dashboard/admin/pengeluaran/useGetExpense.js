import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetExpense = ({ token, search, currentPage, onError, onSuccess }) => {
  return useQuery({
    queryKey: ["dataPengeluaran", search, currentPage],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/expense?search=${search}`, {
        headers,
      });
      return res;
    },
    onError,
    onSuccess
  });
}
