import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../../lib/axios"

export const useGetProfilePic = ({id, token, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["profilePic"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const profilePic = await axiosInstance.get(`/occupant/profile-pic?id=${id}`, {headers: headers})
      return profilePic
    },
    onSuccess,
    onError
  })
}
