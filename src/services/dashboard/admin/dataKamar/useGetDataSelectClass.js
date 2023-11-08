import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetDataSelectClass = ({ token, onSuccess, onError, idSelectRoom }) => {
  return useQuery({
    queryKey: ["detailSelectKamar", idSelectRoom],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(
        `/room/detail-class?id=${idSelectRoom}`,
        { headers }
      );
      return res;
    },
    onSuccess,
    onError
  });
}
