import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetDataPenghuni = ({ token, onSuccess, onError }) => {
  return useQuery({
    queryKey: ["tableDataPenghuni"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/rent?status_id=6,7`, { headers: headers });
      return res;
    },
    onSuccess,
    onError,
  });

}
