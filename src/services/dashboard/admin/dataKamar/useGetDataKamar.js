import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetDataKamar = ({ token, onSuccess, onError, selectRoom, floor, currentPage }) => {
  return useQuery({
    queryKey: ["dataKamar", selectRoom, floor, currentPage],
    queryFn: async () => {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(
        `/room?floor=${floor}&page=${currentPage}&id=${selectRoom}`,
        { headers }
      );
      return res;
    },
    onSuccess,
    onError
  });
}
