import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../lib/axios"

export const useGetProfile = ({token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const getUserProfile = await axiosInstance.get("/occupant", {headers: headers})
      return getUserProfile
    },
    onSuccess,
    onError
  })
}
