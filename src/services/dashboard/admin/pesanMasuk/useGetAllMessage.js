import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetAllMessage = ({ token, onSuccess, onError, status, currentPage}) => {
  return useQuery({
    queryKey: ["getAllMessages", currentPage, status],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(
        `/admin/message?page=${currentPage}&filter=${status}`,
        { headers }
      );
      console.log(status);
      return res.data;
    },
    onSuccess,
    onError
  });
}
