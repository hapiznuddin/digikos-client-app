import Cookies from "js-cookie";
import Input from "../../../../Elements/Input/Input";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ButtonPrimary from "../../../../Elements/Button";
import { useGetAllAccount } from "../../../../../services/dashboard/admin/manageAkun/useGetAllAccount";
import Swal from "sweetalert2";
import { usePromoteAdmin } from "../../../../../services/dashboard/admin/manageAkun/usePromoteAdmin";
import { useResetPassword } from "../../../../../services/dashboard/admin/manageAkun/useResetPassword";
import { useDeleteAccount } from "../../../../../services/dashboard/admin/manageAkun/useDeleteAccount";

const ManageAkun = () => {
  const token = Cookies.get("token");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { data, isLoading, refetch } = useGetAllAccount({
    token,
    search,
    currentPage,
    onSuccess: (data) => {
      setItemsPerPage(data?.per_page);
      setTotalItems(data?.total);
      setCurrentPage(data?.current_page);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const {mutate: promoteAdmin} = usePromoteAdmin({
    token,
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Akun berhasil menjadi admin",
        timer: 2000,
      })
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Akun gagal menjadi admin",
        timer: 2000,
      })
    }
  })

  const {mutate: resetPassword} = useResetPassword({
    token,
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Password akun berhasil direset",
        timer: 2000,
      })
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password akun gagal direset",
        timer: 2000,
      })
    }
  })

  const {mutate: deleteAccount} = useDeleteAccount({
    token,
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Akun berhasil dihapus",
        timer: 2000,
      })
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Akun gagal dihapus",
        timer: 2000,
      })
    }
  })

    // * Pagination
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (event) => {
      setCurrentPage(event.selected + 1);
    };

  return (
    <AdminLayout title="Manajemen Akun">
      <div className="flex flex-col gap-8 bg-neutral-25 px-4 py-8 rounded-xl shadow border border-neutral-100">
        <div className="flex flex-col lg:flex-row w-full justify-between lg:items-center">
          <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">
            Manajemen Akun
          </h1>
          <Input
            type="text"
            placeholder="Cari Akun"
            className="w-80"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr className="font-medium">
                <th>No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th className="w-[450px] "></th>
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
                data?.data.map((akun, index) => {
                  return (
                    <tr key={index}>
                      <th className="font-medium">{index + 1}</th>
                      <td>{akun.name}</td>
                      <td>{akun.email}</td>
                      <td>
                        <div
                          className={`badge h-full py-1 px-3 ${
                            akun.role_id === 1
                              ? "bg-info-200 text-info-800"
                              : akun.role_id === 2
                              ? "bg-secondary-200 text-secondary-800"
                              : "bg-success-200 text-success-800"
                          }`}
                        >
                          {akun.role?.name}
                        </div>
                      </td>
                      <td className="flex gap-2 w-full justify-center items-center">
                        <ButtonPrimary className="btn-md lg:btn-sm w-1/3 text-sm font-normal" onClick={() => promoteAdmin(akun.id)}>Promote Admin</ButtonPrimary>
                        <ButtonPrimary className="btn-md lg:btn-sm w-1/3 text-sm font-normal" onClick={() => resetPassword(akun.id)}>Reset Password</ButtonPrimary>
                        <ButtonPrimary className="btn-md lg:btn-sm w-1/3 text-sm font-normal" onClick={() => deleteAccount(akun.id)}>Hapus Akun</ButtonPrimary>
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

export default ManageAkun;
