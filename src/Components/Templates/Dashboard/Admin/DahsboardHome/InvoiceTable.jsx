import Cookies from "js-cookie";
import ButtonPrimary from "../../../../Elements/Button";
import { useGetInvoice } from "../../../../../services/dashboard/admin/invoice/useGetInvoice";
import CreateInvoice from "./CreateInvoice";

const InvoiceTable = () => {
  const token = Cookies.get("token");

  const {
    data: invoice,
    isLoading: isLoadingInvoice,
    refetch,
  } = useGetInvoice({
    token,
  });

  const dateFormat = (date) => {
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("id-ID", options);
  };

  const rupiahFormat = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="w-full mt-8 p-4 rounded-3xl shadow-lg border border-neutral-100 bg-neutral-25 overflow-auto ">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-2 md:items-center">
        <h1 className="text-neutral-800 text-base md:text-xl font-semibold">
          Tagihan
        </h1>
        <ButtonPrimary
          className="btn btn-sm md:btn-md w-48 text-lg font-normal"
          onClick={() => document.getElementById("my_modal_6").showModal()}
        >
          Buat Tagihan
        </ButtonPrimary>
      </div>
      <dialog id="my_modal_6" className="modal">
        <CreateInvoice refetching={refetch} />
      </dialog>
      <div className="overflow-y-hidden h-full bg-neutral-25 rounded-xl shadow border border-neutral-100">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary-50 text-base text-neutral-800">
            <tr>
              <th className="font-medium">No</th>
              <th className="font-medium">Nama</th>
              <th className="font-medium">Tipe Kamar</th>
              <th className="font-medium">Nomor Kamar</th>
              <th className="font-medium">Tanggal Masuk</th>
              <th className="font-medium">Tagihan Belum Bayar</th>
              <th className="font-medium">Total Tagihan</th>
              <th className="font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingInvoice ? (
              <tr className="text-center">
                <td colSpan={9}>
                  <span className="loading loading-spinner loading-lg text-primary-500" />
                </td>
              </tr>
            ) : invoice.length === 0 ? (
              <tr className="text-center font-medium">
                <td colSpan={9}>Tidak Ada Tagihan</td>
              </tr>
            ) : (
              invoice.map((invoice, index) => {
                return (
                  <tr key={index}>
                    <th className="font-medium">{index + 1}</th>
                    <td>{invoice.name}</td>
                    <td>{invoice.room_name}</td>
                    <td>
                      Lantai {invoice.floor} Nomor {invoice.number}
                    </td>
                    <td>{dateFormat(invoice.start_date)}</td>
                    <td>{dateFormat(invoice.invoice_date)}</td>
                    <td>{rupiahFormat(invoice.price)}</td>
                    <td>
                      <div className="badge h-full py-1 px-3 bg-warning-300 text-warning-900">
                        {invoice.status}
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
};

export default InvoiceTable;
