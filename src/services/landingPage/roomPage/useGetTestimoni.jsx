import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useGetTotalTestimoni = ({ id, onSuccess, onError }) => {
  return useQuery({
    queryKey: ["totalReview"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const res = await axiosInstance.get(
        `/statistic-by-classroom?id_class_room=${id}`,
        { headers }
      );
      return res;
    },
    onError,
    onSuccess
  });
}

export const useGetTestimoniRandom = ({ onSuccess, onError}) => {
  return useQuery({
    queryKey: ["randomReviews"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const res = await axiosInstance.get(`/testimonial-random`, { headers });
      return res;
    },
    onError,
    onSuccess
  })
}

