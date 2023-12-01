import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetDetailMessage = ({ id, token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["getPesan", id],
    queryFn: async () => {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/admin/message/detail?id=${id}`, {
        headers,
      });
      return res.data;
    },
    onSuccess,
    onError
  });
}
