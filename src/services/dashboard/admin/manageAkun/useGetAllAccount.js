import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export const useGetAllAccount = ({ token, onSuccess, onError, search, currentPage}) => {
  return useQuery({
    queryKey: ["getManageAkun", search, currentPage],
    queryFn: async () => {
      const headers = {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/management-user?search=${search}&page=${currentPage}`, {
        headers,
      });
      return res.data;
    },
    onSuccess,
    onError
  });
}
