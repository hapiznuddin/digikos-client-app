import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export const useRoomLandingpage = ({onSuccess, onError}) => {
  return useQuery({
    queryKey: ["roomLandingpage"],
    queryFn: async () => {
      const headers = {
        'content-type': "application/json",
        'accept': "application/json",
      }
      const roomResponse = await axiosInstance.get("/class-room-landingpage", {headers});
      return roomResponse;
    },
    onSuccess,
    onError

  });
};