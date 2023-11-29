import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useGetUser = ({ onSuccess, onError, token }) => {
  return useQuery({
    queryKey: ["navbarGetUser", token],
    queryFn: async () => {
      const headers = {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      }; 
      const getUser = await axiosInstance.get("/user", { headers });
      return getUser;
    },
    
    onSuccess,
    onError
  });
}