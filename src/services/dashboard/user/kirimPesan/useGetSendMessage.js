import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

const useGetSendMessage = ({ token, idRef, onSuccess, onError }) => {
  return useQuery({
    queryKey: ["kirimPesan", idRef],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/user/message?user_id=${idRef}`, {
        headers,
      });
      return res.data;
    },
    onSuccess,
    onError
  });
}

export default useGetSendMessage