import Cookies from "js-cookie";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import { Link } from "react-router-dom";
import { useGetDataPenghuni } from "../../../../../services/dashboard/admin/dataPenghuni/useGetDataPenghuni";
import { useIdOccupantStore } from "../../../../../lib/idClassRoom";
import { useEffect } from "react";

const DataPenghuni = () => {
  const token = Cookies.get("token");
  const setId = useIdOccupantStore((state) => state.setId);

  const { data, isLoading } = useGetDataPenghuni({
    token,
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    data?.data.map((data) => {
      setId(data.occupant_id);
    });
  }, [data, setId]);

  const dateFormat = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return (
    <AdminLayout title="Data Penghuni">
      <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary-50 text-base text-neutral-800">
            <tr>
              <th className="font-medium">No</th>
              <th className="font-medium">Nama</th>
              <th className="font-medium">Nomor HP</th>
              <th className="font-medium">Alamat</th>
              <th className="font-medium">Kamar</th>
              <th className="font-medium">Tanggal Masuk</th>
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
            ) : data?.data.length === 0 ? (
              <tr className="text-center font-medium">
                <td colSpan={9}>Tidak Ada Data Penghuni</td>
              </tr>
            ) : (
              data?.data.map((rent, index) => {
                return (
                  <tr key={index}>
                    <th className="font-medium">{index + 1}</th>
                    <td>{rent.name}</td>
                    <td>{rent.phone}</td>
                    <td className="max-w-[200px]">{rent.address}</td>
                    <td>
                      Lantai {rent.room?.floor} Nomor {rent.room?.number_room}
                    </td>
                    <td>{dateFormat(rent.start_date)}</td>
                    <td>
                      <div className="badge h-full py-1 px-3 bg-success-200 text-success-800">
                        Sewa
                      </div>
                    </td>
                    <td className="font-semibold text-base hover:text-primary-500 cursor-pointer">
                      <Link
                        to={`/admin/dashboard/dataPenghuni/detail/${rent.id}`}
                      >
                        <button className="btn btn-sm btn-ghost text-primary-500 rounded-full font-medium text-base text-center hover:bg-primary-100">
                          Detail
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default DataPenghuni;
