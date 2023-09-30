import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useRoomLandingpage = () => {
  const { data, isLoading} = useQuery({
    queryKey: ["roomLandingpage"],
    queryFn: async () => {
      const headers = {
        'content-type': "application/json",
        'accept': "application/json",
      }
      const roomResponse = await axiosInstance.get("/class-room-landingpage", {headers});
      return roomResponse;
    },
  });

  return {
    data,
    isLoading
  }
};