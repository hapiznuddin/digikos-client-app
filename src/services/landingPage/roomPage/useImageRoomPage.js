import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useImageRoomPage = ({id, onSuccess, onError}) => {
  return useQuery({
    queryKey: ["imageRoom"],
    queryFn: async () => {
      const headers = {
        'content-type': "application/json",
        'accept': "application/json",
      }
      const imageRoom = await axiosInstance.get(`/class-room/image?id=${id}`, {headers});
      return imageRoom
    },
    onSuccess,
    onError
  })
}
