import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import { axiosInstance } from "../../../../../lib/axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const PengajuanSewa = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useQuery({
    queryKey: ["tablePengajuanSewa"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/rent`, { headers: headers });
      return res;
    },
    onSuccess: (data) => {
      console.log(data?.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const rupiahFormater = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }
  return (
    <AdminLayout title="Pengajuan Sewa">
      <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary-50 text-base text-neutral-600">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Tipe Kamar</th>
              <th>Nomor Kamar</th>
              <th>Lantai</th>
              <th>Harga Kamar</th>
              <th>Deposit</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (<tr className="text-center">
              <td colSpan={9}>
              <span className="loading loading-spinner loading-lg text-primary-500"/>
              </td>
              </tr>) : (data?.data.map((rent, index) => {
              return (
                <tr key={index} >
                  <th>{index + 1}</th>
                  <td>{rent.name}</td>
                  <td>{rent.classroom?.name}</td>
                  <td>{rent.room?.number_room}</td>
                  <td>{rent.room?.floor}</td>
                  <td>{rupiahFormater(rent.price)}</td>
                  <td>{rupiahFormater(rent.classroom?.deposit)}</td>
                  <td><div className="badge bg-secondary-100 text-secondary-800">{rent.status}</div></td>
                  <td className="font-medium hover:text-primary-500 cursor-pointer"><Link>Detail
                  </Link></td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default PengajuanSewa;
