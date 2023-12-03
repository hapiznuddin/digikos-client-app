/* eslint-disable react/display-name */
import Cookies from "js-cookie";
import { useGetHistoryPayment } from "../../../../../services/dashboard/admin/dataPenghuni/useGetHistoryPayment";
import { forwardRef } from "react";
import ButtonPrimary from "../../../../Elements/Button";

const TableHistoryPayOccupant = forwardRef((props, ref) => {
  const idRef = ref.current;
  const token = Cookies.get("token");

  const { data: getHistory, isLoading: isLoadingHistory } =
    useGetHistoryPayment({
      token,
      idOccupant: "",
      userOccupant: idRef,
    });

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  }

  function rupiahFormatter(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col md:flex-row gap-2 justify-between mditems-center">
      <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">
        Riwayat Pembayaran
      </h1>
      <ButtonPrimary className="w-40 md:w-48 font-medium text-sm md:text-base">Check Tagihan</ButtonPrimary>
      </div>
      <div className="overflow-auto bg-neutral-25 max-h-[300px] rounded-xl shadow border border-neutral-100">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary-50 text-base text-neutral-800">
            <tr>
              <th className="font-medium">No</th>
              <th className="font-medium">Tanggal Pembayaran</th>
              <th className="font-medium">Total Tagihan</th>
              <th className="font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingHistory ? (
              <tr className="text-center">
                <td colSpan={9}>
                  <span className="loading loading-spinner loading-lg text-primary-500" />
                </td>
              </tr>
            ) : getHistory?.data.length === 0 ? (
              <tr className="text-center font-medium">
                <td colSpan={9}>Tidak Ada Data Penghuni</td>
              </tr>
            ) : (
              getHistory?.data.map((rent, index) => {
                return (
                  <tr key={index}>
                    <th className="font-medium">{index + 1}</th>
                    <td>{formatDate(rent.created_at)}</td>
                    <td>{rupiahFormatter(rent.price)}</td>
                    <td>
                      <div
                        className={`badge h-full py-1 px-3 ${
                          rent.status === "pending"
                            ? "bg-warning-200 text-warning-800"
                            : "bg-success-200 text-success-800"
                        }`}
                      >
                        {rent.status}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TableHistoryPayOccupant;
