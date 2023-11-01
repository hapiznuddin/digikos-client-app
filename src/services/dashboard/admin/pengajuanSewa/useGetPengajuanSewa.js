import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios';

export const useGetPengajuanSewa = ({ token, onSuccess, onError }) => {
  return useQuery({
    queryKey: ["tablePengajuanSewa"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/rent?status_id=1,2,3,4`, { headers: headers });
      return res;
    },
    onSuccess,
    onError,
  });
}
