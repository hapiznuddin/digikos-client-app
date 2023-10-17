import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
export const useGetUser = ({ onSuccess, onError }) => {
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