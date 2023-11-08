import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetDetailKamar = ({ token, onSuccess, onError, id}) => {
  return useQuery({
    queryKey: ["detailKamar", id],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/room/detail?id=${id}`, { headers });
      return res;
    },
    onSuccess,
    onError
  });
}
