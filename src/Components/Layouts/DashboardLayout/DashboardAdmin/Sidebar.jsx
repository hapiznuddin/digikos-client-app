/* eslint-disable no-unused-vars */
import { forwardRef } from "react";
import { FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLogout } from "../../../../services/auth/useLogout";
import { TbMail, TbTableAlias, TbTableRow } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { LuFileOutput } from "react-icons/lu";
import { BsClipboardData } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";

const SideBar = forwardRef(({ showNav, routeParams }, ref) => {
  const token = Cookies.get("token");
  SideBar.propTypes = {
    routeParams: PropTypes.number
  }
  const role = Cookies.get("role");
  const navigate = useNavigate();
  const location = useLocation();

  SideBar.propTypes = {
    showNav: PropTypes.bool,
  };

  const { mutate } = useLogout({
    token,
    onSuccess: () => {
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("name");
      navigate("/");
    }
  });
  const logout = () => {
    mutate();
  };

  return (
    <div
      ref={ref}
      className="fixed w-60 h-full bg-neutral-25 drop-shadow-md z-10"
    >
      <div className="flex justify-center mt-6 mb-14">
        <img src="/digikos.png" className="w-32" />
      </div>

      <div className="flex flex-col h-[85%]  justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h1 className="text-neutral-800 text-lg font-medium px-4 mb-2">
              Main Menu
            </h1>
            <button>
              <Link to="/admin/dashboard">
                <div
                  className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-2 flex items-center transition-colors ${
                    location.pathname == "/admin/dashboard"
                      ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                      : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600 "
                  }`}
                >
                  <div className="mr-2">
                    <GoHome size={24} />
                  </div>
                  <div>
                    <p>Beranda</p>
                  </div>
                </div>
              </Link>
            </button>
            <button>
              <Link to="/admin/dashboard/pengajuansewa">
                <div
                  className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
                    location.pathname == "/admin/dashboard/pengajuansewa" || location.pathname == `/admin/dashboard/pengajuansewa/detail/${routeParams}` 
                      ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                      : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
                  }`}
                >
                  <div className="mr-2">
                    <CgNotes size={24} />
                  </div>
                  <div>
                    <p>Pengajuan Sewa</p>
                  </div>
                </div>
              </Link>
            </button>
            <button>
              <Link to="/dashboard/">
                <div
                  className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
                    location.pathname == "/dashboard/"
                      ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                      : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
                  }`}
                >
                  <div className="mr-2">
                    <LuFileOutput size={24} />
                  </div>
                  <div>
                    <p>Pengeluaran</p>
                  </div>
                </div>
              </Link>
            </button>

            {/* // * Laporan ada di role Owner */}
            {role == "Owner" ? (
              <button>
                <Link to="/dashboard/">
                  <div
                    className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
                      location.pathname == "/dashboard/"
                        ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                        : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
                    }`}
                  >
                    <div className="mr-2">
                      <BsClipboardData size={24} />
                    </div>
                    <div>
                      <p>Laporan</p>
                    </div>
                  </div>
                </Link>
              </button>
            ) : null}
          </div>
          <div className="flex flex-col">
            <h1 className="text-neutral-800 text-lg font-medium px-4 mb-2">
              Pusat Data
            </h1>
            
            <button>
              <Link to="/admin/dashboard/dataTipeKamar">
                <div
                  className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-2 flex items-center transition-colors ${
                    location.pathname == "/admin/dashboard/dataTipeKamar" || location.pathname == `/admin/dashboard/dataTipeKamar/tambahKamar` || location.pathname == `/admin/dashboard/dataTipeKamar/detail/${routeParams}` || location.pathname == `/admin/dashboard/dataTipeKamar/detail/edit/${routeParams}`
                      ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                      : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600 "
                  }`}
                >
                  <div className="mr-2">
                    <TbTableRow size={24} />
                  </div>
                  <div>
                    <p>Data Tipe Kamar</p>
                  </div>
                </div>
              </Link>
            </button>
            <button>
              <Link to="/admin/dashboard/dataKamar">
                <div
                  className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
                    location.pathname == "/admin/dashboard/dataKamar" || location.pathname == `/admin/dashboard/dataKamar/detail/${routeParams}`
                      ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                      : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
                  }`}
                >
                  <div className="mr-2">
                    <TbTableRow size={24} />
                  </div>
                  <div>
                    <p>Data Kamar</p>
                  </div>
                </div>
              </Link>
            </button>
            <button>
              <Link to="/admin/dashboard/dataPenghuni">
                <div
                  className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
                    location.pathname == "/admin/dashboard/dataPenghuni" || location.pathname == `/admin/dashboard/dataPenghuni/detail/${routeParams}` 
                      ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                      : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
                  }`}
                >
                  <div className="mr-2">
                    <TbTableAlias size={24} />
                  </div>
                  <div>
                    <p>Data Penghuni</p>
                  </div>
                </div>
              </Link>
            </button>
            <button>
              <Link to="/dashboard/">
                <div
                  className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
                    location.pathname == "/dashboard/"
                      ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                      : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
                  }`}
                >
                  <div className="mr-2">
                    <TbMail size={24} />
                  </div>
                  <div>
                    <p>Pesan Masuk</p>
                  </div>
                </div>
              </Link>
            </button>

            {/* // * Laporan ada di role Owner */}
            {role == "Owner" ? (
              <button>
                <Link to="/dashboard/">
                  <div
                    className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
                      location.pathname == "/dashboard/"
                        ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                        : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
                    }`}
                  >
                    <div className="mr-2">
                      <MdOutlineManageAccounts size={24} />
                    </div>
                    <div>
                      <p>Data Akun</p>
                    </div>
                  </div>
                </Link>
              </button>
            ) : null}
          </div>
        </div>

        <button onClick={logout}>
          <div
            className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname == "/login"
                ? "bg-primary-500 text-neutral-25"
                : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
            }`}
          >
            <div className="mr-2">
              <FiLogOut size={24} />
            </div>
            <div>
              <p>Logout</p>
            </div>
          </div>
        </button>
      </div>
      <p className="text-gray-700 text-xs mx-5 mt-4 font-light"></p>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
