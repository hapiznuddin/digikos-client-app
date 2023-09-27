import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useRoomLandingpage = () => {
  const { data, isLoading} = useQuery({
    queryKey: ["roomLandingpage"],
    queryFn: async () => {
      const roomResponse = await axiosInstance.get("/class-room-landingpage");
      return roomResponse;
    },
  });

  return {
    data,
    isLoading
  }
};