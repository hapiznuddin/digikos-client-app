import Cookies from "js-cookie";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../../../Elements/Button";
import { useGetDataTipeKamar } from "../../../../../services/dashboard/admin/dataTipeKamar/useGetDataTipeKamar";

const DataTipeKamar = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetDataTipeKamar({
    token,
    onError: (error) => {
      console.log(error);
    },
  });

  const rupiahFormatter = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <AdminLayout title="Data Tipe Kamar">
      <div className="flex flex-col gap-8 bg-neutral-25 px-4 py-8 rounded-xl shadow border border-neutral-100">
        <div className="flex flex-col gap-4 md:flex-row w-full justify-between md:items-center">
          <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">
            Tipe Kamar
          </h1>
          <ButtonPrimary className="text-sm md:text-base font-medium w-60">
            Tambah Tipe Kamar
          </ButtonPrimary>
        </div>
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr>
                <th className="font-medium">No</th>
                <th className="font-medium">Nama Kamar</th>
                <th className="font-medium">Ukuran</th>
                <th className="font-medium">Fasilitas</th>
                <th className="font-medium">Harga Kamar</th>
                <th className="font-medium">Deposit</th>
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
                  <td colSpan={9}>Tidak Ada Data Tipe Kamar</td>
                </tr>
              ) : (
                data?.data.map((room, index) => {
                  const facilities = [];
                  if (room.facility?.ac === 1) {
                    facilities.push("AC");
                  }
                  if (room.facility?.meja === 1) {
                    facilities.push("Meja");
                  }
                  if (room.facility?.wifi === 1) {
                    facilities.push("Wifi");
                  }
                  if (room.facility?.lemari === 1) {
                    facilities.push("Lemari");
                  }
                  if (room.facility?.kasur === 1) {
                    facilities.push("Kasur");
                  }
                  if (room.facility?.km_luar === 1) {
                    facilities.push("Kamar Mandi Luar");
                  }
                  if (room.facility?.km_dalam === 1) {
                    facilities.push("Kamar Mandi Dalam");
                  }
                  return (
                    <tr key={index}>
                      <th className="font-medium">{index + 1}</th>
                      <td>{room.room_name}</td>
                      <td>{room.room_size}</td>
                      <td className="max-w-[180px]">{facilities.join(", ")}</td>
                      <td>{rupiahFormatter(room.room_price)}</td>
                      <td>{rupiahFormatter(room.room_deposite)}</td>
                      <td className="font-semibold text-base hover:text-primary-500 cursor-pointer">
                        <Link to={`/admin/dashboard/dataTipeKamar/detail/${room.id}`}>
                          Detail
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DataTipeKamar;
