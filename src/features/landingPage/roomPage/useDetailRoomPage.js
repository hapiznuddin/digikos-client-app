import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useDetailRoomPage = ({id, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["detailRoom"],
    queryFn: async () => {
      const headers = {
        'content-type': "application/json",
        'accept': "application/json",
      }
      const classRoom = await axiosInstance.get(`/class-room-detail-landingpage?id=${id}`, {headers});
      return classRoom
    },
    onSuccess,
    onError
  })
}

