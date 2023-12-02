import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useGetPengajuanSewa } from "../../../../../services/dashboard/admin/pengajuanSewa/useGetPengajuanSewa";

const PengajuanSewa = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetPengajuanSewa({
    token,
    onError: (error) => {
      console.log(error);
    },
  });

  const rupiahFormater = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };
  return (
    <AdminLayout title="Pengajuan Sewa">
      <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary-50 text-base text-neutral-800">
            <tr>
              <th className="font-medium">No</th>
              <th className="font-medium">Nama</th>
              <th className="font-medium">Tipe Kamar</th>
              <th className="font-medium">Nomor Kamar</th>
              <th className="font-medium">Lantai</th>
              <th className="font-medium">Harga Kamar</th>
              <th className="font-medium">Deposit</th>
              <th className="font-medium">Status</th>
              <th className="font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="text-center">
                <td colSpan={9}>
                  <span className="loading loading-spinner loading-lg text-primary-500" />
                </td>
              </tr>
            ) : data?.data.length > 0 ? (
              data?.data.map((rent, index) => {
                return (
                  <tr key={index}>
                    <th className="font-medium">{index + 1}</th>
                    <td>{rent.name}</td>
                    <td>{rent.classroom?.name}</td>
                    <td>{rent.room?.number_room}</td>
                    <td>{rent.room?.floor}</td>
                    <td>{rupiahFormater(rent.price)}</td>
                    <td>{rupiahFormater(rent.classroom?.deposit)}</td>
                    <td>
                      {rent.status_id === 5 ? (
                        <div className="badge h-full py-1 px-3 bg-success-200 text-success-800">
                          {rent.status}
                        </div>
                      ) : (
                        <div className="badge h-full bg-secondary-100 text-secondary-800 py-1 px-3">
                          {rent.status}
                        </div>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/admin/dashboard/pengajuansewa/detail/${rent.id}`}
                      >
                        <button
                          className="btn btn-sm btn-ghost text-primary-500 rounded-full font-medium text-base text-center hover:bg-primary-100"
                        >
                          Detail
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center font-medium">
                <td colSpan={9}>Tidak Ada Pengajuan Sewa</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default PengajuanSewa;
