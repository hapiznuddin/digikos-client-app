import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useGetStatisticRoom = ({ token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["statisticDashboard"],
    queryFn: async () => {
      const headers = {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      }; 
      const res = await axiosInstance.get("/rent/statistic", { headers });
      return res.data;
    },
    onSuccess,
    onError
  })
}
