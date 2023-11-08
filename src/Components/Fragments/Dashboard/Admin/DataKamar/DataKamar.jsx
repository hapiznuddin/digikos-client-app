import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import ButtonPrimary from "../../../../Elements/Button";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetDataKamar } from "../../../../../services/dashboard/admin/dataKamar/useGetDataKamar";
import TambahKamar from "./TambahKamar";
import Input from "../../../../Elements/Input/Input";

const DataKamar = () => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();
  const [selectRoom, setSelectRoom] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [search, setSearch] = useState("");
  const [floor, setFloor] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // * Fetch Data Kamar
  const { data, isLoading, refetch } = useGetDataKamar({
    token,
    selectRoom,
    floor,
    currentPage,
    selectStatus,
    search,
    onSuccess: (data) => {
      setItemsPerPage(data?.data?.per_page);
      setTotalItems(data?.data?.total);
      setCurrentPage(data?.data?.current_page);
    },
    onError: (data) => {
      console.log(data);
    },
  });


  // * Handle Change Select
  const handleSelectRoomChange = (e) => {
    setSelectRoom(e.target.value);
    queryClient.invalidateQueries(["dataKamar", e.target.value]);
  };
  const handleSelectStatusChange = (e) => {
    setSelectStatus(e.target.value);
    queryClient.invalidateQueries(["dataKamar", e.target.value]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    refetch()
  }

  // * Handle Change Floor
  const handleFloorChange = (selectedFloor) => {
    setFloor(selectedFloor);
  };

  // * Rupiah Formatter
  const rupiahFormatter = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
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

  // * Render Table With Sort And Pagination
  const renderTableRooms = () => {
    return slicedAndSortedData.map((room, index) => (
      <tr key={index}>
        <th className="font-medium">{index + 1}</th>
        <td>{room.class_room?.room_name}</td>
        <td>{room.number_room}</td>
        <td>{room.number_floor}</td>
        <td>{room.room_size}</td>
        <td>{rupiahFormatter(room.room_price)}</td>
        <td>
          {room.status_room === "Terisi" ? (
            <div className="badge bg-success-100 text-success-700 py-1 px-2 h-full">
              {room.status_room}
            </div>
          ) : (
            <div className="badge bg-secondary-50 text-secondary-700 py-1 px-2 h-full">
              {room.status_room}
            </div>
          )}
        </td>
        <td className="font-semibold text-base hover:text-primary-500 cursor-pointer">
          <Link to={`/admin/dashboard/dataKamar/detail/${room.id}`}>Detail</Link>
        </td>
      </tr>
    ));
  };

  return (
    <AdminLayout title="Data Kamar">
      <div className="flex flex-col gap-8 bg-neutral-25 px-4 py-8 rounded-xl shadow border border-neutral-100">
        <div className="flex flex-col gap-6 lg:flex-row md:gap-4 justify-between">
          <ButtonPrimary
            className="text-sm md:text-base font-medium md:w-60"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Tambah Kamar
          </ButtonPrimary>
          <div className="flex gap-4 w-full lg:w-2/3">

          {/* Select Room */}
          <select
            value={selectRoom}
            className="select w-full  border border-neutral-300 rounded-full hover:border-primary-500 focus:outline-primary-500"
            onChange={handleSelectRoomChange}
          >
            <option value="" selected>
              Filter Kamar
            </option>
            <option value="1">Kamar Standar</option>
            <option value="2">Kamar Deluxe</option>
            <option value="3">Kamar Premium</option>
          </select>

          {/* Select Room */}
          <select
            value={selectStatus}
            className="select w-full  border border-neutral-300 rounded-full hover:border-primary-500 focus:outline-primary-500"
            onChange={handleSelectStatusChange}
          >
            <option value="" selected>
              Filter Status
            </option>
            <option value="Terisi">Terisi</option>
            <option value="Tidak Terisi">Tidak Terisi</option>
          </select>

          <Input className="w-full " placeholder="Cari sesuatu..." value={search} onChange={handleSearch}/>
            </div>
        </div>

        {/* Tabs Floor */}
        <div className="tabs -mb-8">
          {[1, 2, 3, 4, 5].map((floorNumber) => (
            <a
              key={floorNumber}
              className={`tab tab-lifted text-xs md:text-sm lg:text-base font-medium hover:text-primary-500 ${
                floor === floorNumber ? "tab-active text-primary-500" : ""
              }`}
              onClick={() => handleFloorChange(floorNumber)}
            >
              Lantai {floorNumber}
            </a>
          ))}
        </div>

        {/* Table Kamar */}
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr>
                <th className="font-medium">No</th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("room_name")}
                >
                  Nama Kamar{" "}
                  {sortColumn === "room_name" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("number_room")}
                >
                  Nomor Kamar{" "}
                  {sortColumn === "number_room" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("number_floor")}
                >
                  Lantai{" "}
                  {sortColumn === "number_floor" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("room_size")}
                >
                  Ukuran{" "}
                  {sortColumn === "room_size" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("room_price")}
                >
                  Harga Kamar{" "}
                  {sortColumn === "room_price" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th
                  className="font-medium cursor-pointer"
                  onClick={() => handleSort("status_room")}
                >
                  Status{" "}
                  {sortColumn === "status_room" && (
                    <span>{sortOrder === "asc" ? " ↓" : " ↑"}</span>
                  )}
                </th>
                <th className="font-medium cursor-pointer"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="text-center">
                  <td colSpan={9}>
                    <span className="loading loading-spinner loading-lg text-primary-500" />
                  </td>
                </tr>
              ) : slicedAndSortedData.length === 0 ? (
                <tr className="text-center font-medium">
                  <td colSpan={9}>Tidak Ada Data Kamar</td>
                </tr>
              ) : (
                renderTableRooms(slicedAndSortedData)
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
        <TambahKamar refetch={refetch}/>
      </dialog>
    </AdminLayout>
  );
};

export default DataKamar;
