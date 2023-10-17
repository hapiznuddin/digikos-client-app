import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useFacilityPage = ({ id, onSuccess, onError}) => {
  return useQuery({
    queryKey: ['facility', id],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const resFacility = await axiosInstance.get(`/facility-landingpage?id=${id}`, { headers });
      return resFacility
    },
    onSuccess,
    onError
  })
}
