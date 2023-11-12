import ButtonPrimary from "../../../../Elements/Button";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import Input from "../../../../Elements/Input/Input";
import TambahPengeluaran from "./TambahPengeluaran";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetExpense } from "../../../../../services/dashboard/admin/pengeluaran/useGetExpense";

const Pengeluaran = () => {
  const token = Cookies.get("token");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { data, isLoading, refetch } = useGetExpense({
    token,
    search,
    currentPage,
    onError: (data) => {
      console.log(data);
    },
    onSuccess: (data) => {
      setItemsPerPage(data?.data?.per_page);
      setTotalItems(data?.data?.total);
      setCurrentPage(data?.data?.current_page);
    },
  });

  // * Handle Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    refetch();
    queryClient.invalidateQueries(["dataKamar"]);
  };

  // * Rupiah Formatter
  const rupiahFormatter = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  // * Date Formatter
  const dateFormatter = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  // * Month Formatter
  const monthFormatter = (date) => {
    const options = { year: "numeric", month: "long" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  // * Handle Sort Data
  const handleSort = (column) => {
    if (column === sortColumn) {
      // Jika kolom yang sama diklik lagi, balik arah urutan
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Jika kolom berbeda diklik, atur kolom baru dan urutan 'asc'
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // * Sort Data Kamar
  const sortedData = data?.data?.data.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortColumn] < b[sortColumn] ? -1 : 1;
    } else {
      return a[sortColumn] > b[sortColumn] ? -1 : 1;
    }
  });

  // * Pagination
  const slicedAndSortedData = sortedData ? sortedData.slice() : [];
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const renderTableExpense = () => {
    return slicedAndSortedData.map((data, index) => {
      return (
        <tr key={index}>
          <th className="font-medium">{index + 1}</th>
          <td>{data.expense}</td>
          <td>{monthFormatter(data.period)}</td>
          <td>{dateFormatter(data.date_paid)}</td>
          <td>{rupiahFormatter(data.total_payment)}</td>
          <td>{data.employee}</td>
        </tr>
      );
    });
  };

  return (
    <AdminLayout title="Pengeluaran">
      <div className="flex flex-col gap-8 bg-neutral-25 px-4 py-8 rounded-xl shadow border border-neutral-100">
        <div className="flex flex-col gap-4 md:flex-row w-full justify-between md:items-center">
          <ButtonPrimary
            className="text-sm md:text-base font-medium md:w-60"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Tambah Pembayaran
          </ButtonPrimary>
          <div className="flex gap-4">
            <Input
              className="w-full "
              placeholder="Cari sesuatu..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr>
                <th className="font-medium">No</th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("expense")}
                >
                  Jenis Pengeluaran{" "}
                  {sortColumn === "expense" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("period")}
                >
                  Periode Pembayaran{" "}
                  {sortColumn === "period" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("date_paid")}
                >
                  Tanggal Pembayaran{" "}
                  {sortColumn === "date_paid" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("total_payment")}
                >
                  Total Pembayaran{" "}
                  {sortColumn === "total_payment" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("employee")}
                >
                  Petugas{" "}
                  {sortColumn === "employee" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="text-center">
                  <td colSpan={9}>
                    <span className="loading loading-spinner loading-lg text-primary-500" />
                  </td>
                </tr>
              ) : data?.data?.data.length === 0 ? (
                <tr className="text-center font-medium">
                  <td colSpan={9}>Tidak Ada Data Pengeluaran</td>
                </tr>
              ) : (
                renderTableExpense()
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
      <dialog id="my_modal_1" className="modal">
        <TambahPengeluaran refetch={refetch()}/>
      </dialog>
    </AdminLayout>
  );
};

export default Pengeluaran;
