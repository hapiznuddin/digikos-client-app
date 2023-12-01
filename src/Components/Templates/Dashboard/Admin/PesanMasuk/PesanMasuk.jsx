import Cookies from "js-cookie";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetAllMessage } from "../../../../../services/dashboard/admin/pesanMasuk/useGetAllMessage";
import DetailPesan from "./DetailPesan";

const PesanMasuk = () => {
  const token = Cookies.get("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, refetch } = useGetAllMessage({
    token,
    status,
    currentPage,
    onSuccess: (data) => {
      setItemsPerPage(data?.pagination?.per_page);
      setTotalItems(data?.pagination?.total);
      setCurrentPage(data?.pagination?.current_page);
    },
  });

  // * Pagination
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected + 1);
  };


  return (
    <AdminLayout title="Pesan Masuk">
      <div className="flex flex-col gap-8 bg-neutral-25 px-4 py-8 rounded-xl shadow border border-neutral-100">
        <div className="flex flex-col lg:flex-row w-full justify-between lg:items-center">
          <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">
            Pesan Masuk
          </h1>
          <select
            className="select w-full max-w-xs rounded-full border border-primary-500 focus:outline-primary-500" 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Pilih Status</option>
            <option value="terkirim">Terkirim</option>
            <option value="diterima">Diterima</option>
            <option value="dikerjakan">Dikerjakan</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr className="font-medium">
                <th>No</th>
                <th>Nama</th>
                <th>Nama Kamar</th>
                <th>Kamar</th>
                <th>Tanggal</th>
                <th>Keluhan</th>
                <th>Status</th>
                <th></th>
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
                  <td colSpan={9}>Tidak Ada Tagihan</td>
                </tr>
              ) : (
                data?.data.map((message, index) => {
                  return (
                    <tr key={index}>
                      <th className="font-medium">{index + 1}</th>
                      <td>{message.name}</td>
                      <td>{message.room_name}</td>
                      <td>
                        Lantai {message.floor} no {message.number}
                      </td>
                      <td>{message.created_at}</td>
                      <td>{message.message}</td>
                      <td>
                        <div
                          className={`badge h-full py-1 px-3 ${
                            message.status === "Diterima"
                              ? "bg-info-200 text-info-800"
                              : message.status === "Terkirim"
                              ? "bg-primary-100 text-primary-800"
                              : message.status === "Dikerjakan"
                              ? "bg-secondary-200 text-secondary-800"
                              : "bg-success-200 text-success-800"
                          }`}
                        >
                          {message.status}
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-ghost text-primary-500 rounded-full font-medium text-base text-center hover:bg-primary-100"
                          onClick={() =>
                            document.getElementById("my_modal_1").showModal()
                          }
                          onClickCapture={() => {
                            setSelectedId(message.id);
                          }}
                        >
                          Detail
                        </button>
                        <dialog id="my_modal_1" className="modal">
                          <DetailPesan id={selectedId} refetching={refetch}/>
                        </dialog>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          containerClassName="pagination flex gap-2 justify-center items-center w-full mx-auto text-neutral-800"
          pageClassName="bg-neutral-25 rounded-md text-center w-9 shadow-md border border-neutral-100 font-medium py-1 hover:bg-primary-50"
          previousClassName="bg-neutral-25 rounded-md text-center w-9 h-9 flex justify-center items-center shadow-md border border-neutral-100 font-medium hover:bg-primary-50"
          nextClassName="bg-neutral-25 rounded-md text-center w-9 h-9 flex justify-center items-center shadow-md border border-neutral-100 font-medium hover:bg-primary-50"
          breakClassName="bg-neutral-200 rounded-md text-center w-9 shadow-md border border-neutral-100 font-medium py-1 hover:bg-primary-50"
          activeClassName="bg-primary-100 rounded-md text-center w-9 shadow-md border border-neutral-100 font-bold py-1"
          previousLabel={<FaChevronLeft size={16} />}
          nextLabel={<FaChevronRight size={16} />}
          breakLabel={"..."}
          pageCount={pageCount} // Menggunakan pageCount yang telah dihitung
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange} // Anda perlu menambah 1 ke selected karena ReactPaginate menghitung halaman dari 0
        />
      </div>
    </AdminLayout>
  );
};

export default PesanMasuk;
