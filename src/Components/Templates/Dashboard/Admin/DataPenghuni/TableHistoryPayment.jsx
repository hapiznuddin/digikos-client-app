import Cookies from "js-cookie";
import PropTypes from "prop-types"
import { useGetHistoryPayment } from "../../../../../services/dashboard/admin/dataPenghuni/useGetHistoryPayment";

const TableHistoryPayment = ({ idOccupant }) => {
  TableHistoryPayment.propTypes = {
    idOccupant: PropTypes.number
  }
  const token = Cookies.get("token")
  const {data, refetch, isLoading} = useGetHistoryPayment({
    token,
    idOccupant,
    onSuccess: () => {
    },
    onError: (data) => {
      refetch();
      console.log(data);
    },
  })

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

  function rupiahFormatter(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">Riwayat Pembayaran</h1>
    <div className="overflow-auto bg-neutral-25 max-h-[300px] rounded-xl shadow border border-neutral-100">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary-50 text-base text-neutral-800">
            <tr>
              <th className="font-medium">No</th>
              <th className="font-medium">Tanggal Bayar</th>
              <th className="font-medium">Total Bayar</th>
              <th className="font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (<tr className="text-center">
              <td colSpan={9}>
              <span className="loading loading-spinner loading-lg text-primary-500"/>
              </td>
              </tr>) : (
                data?.data.length === 0 ?  (
                  <tr className="text-center font-medium">
                    <td colSpan={9}>Tidak Ada Data Penghuni</td>
                  </tr>
                ) : (
                data?.data.map((rent, index) => {
              return (
                <tr key={index} >
                  <th className="font-medium">{index + 1}</th>
                  <td>{formatDate(rent.created_at)}</td>
                  <td>{rupiahFormatter(rent.price)}</td>
                  <td>{rent.status === "pending" ? (<div className="badge h-full py-1 px-3 bg-secondary-100 text-secondary-800">{rent.status}</div>) : (<div className="badge h-full py-1 px-3 bg-success-200 text-success-800">{rent.status}</div>)}</td>
                </tr>
              );
            })) )}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default TableHistoryPayment