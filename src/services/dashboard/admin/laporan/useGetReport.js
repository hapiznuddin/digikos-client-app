import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetReport = ({ token, monthly, yearly, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["getReport", monthly, yearly],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(
        `/report?month=${monthly}&year=${yearly}`,
        { headers }
      );
      return res.data;
    },
    onSuccess,
    onError
  });
}
