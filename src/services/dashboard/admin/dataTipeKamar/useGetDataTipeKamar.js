import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetDataTipeKamar = ({ token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["tableTipeKamar"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/class-room`, { headers: headers });
      return res;
    },
    onSuccess,
    onError
  });
}
