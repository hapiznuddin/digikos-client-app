import { PiUserFill } from "react-icons/pi"
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout"
import { FaHouseUser } from "react-icons/fa"
import { MdAddHome } from "react-icons/md"
import { TbHome } from "react-icons/tb"
import PictureProfile from "../../../LandingPage/UserPage/ProfilePage/PictureProfile"
import Cookies from "js-cookie"
import ChangePasswordSection from "../../User/UserHome/ChangePasswordSection"

const DashboardHomeAdmin = () => {
  const role = Cookies.get("role");
  return (
    <AdminLayout title="Dashboard Admin">
      <div className="flex flex-col w-full h-full gap-4 md:gap-8 rounded-3xl shadow-lg border border-neutral-100 p-8 bg-neutral-25">
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6 lg:gap-12">
          <div className="flex flex-col justify-center w-full md:w-1/2 h-36 rounded-3xl p-8 bg-purple relative overflow-hidden">
            <h1 className="text-neutral-25 text-2xl font-medium">10</h1>
            <p className="text-neutral-25 text-lg font-medium">Total Penghuni</p>
            <PiUserFill size={133} className="absolute -bottom-4 -right-7 text-[#6F3E9A]"/>
          </div>
          <div className="flex flex-col justify-center p-8 w-full md:w-1/2 h-36 rounded-3xl bg-orange relative overflow-hidden">
          <h1 className="text-neutral-25 text-2xl font-medium">10</h1>
            <p className="text-neutral-25 text-lg font-medium">Kamar Terisi</p>
            <FaHouseUser size={133} className="absolute -bottom-3 -right-6 text-[#CE8600]"/>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6 lg:gap-12">
          <div className="flex flex-col justify-center w-full md:w-1/2 h-36 rounded-3xl p-8 bg-tosca relative overflow-hidden">
            <h1 className="text-neutral-25 text-2xl font-medium">10</h1>
            <p className="text-neutral-25 text-lg font-medium">Kamar Kosong</p>
            <MdAddHome size={133} className="absolute -bottom-2 -right-2 text-[#089A95]"/>
          </div>
          <div className="flex flex-col justify-center p-8 w-full md:w-1/2 h-36 rounded-3xl bg-cyan relative overflow-hidden">
          <h1 className="text-neutral-25 text-2xl font-medium">10</h1>
            <p className="text-neutral-25 text-lg font-medium">Total Kamar</p>
            <TbHome size={133} className="absolute -bottom-3 -right-6 text-[#037DB2]"/>
          </div>
        </div>
      </div>
      <div className="flex w-full mt-8 gap-12">
        <div className="flex flex-col justify-center gap-2 items-center w-1/2 h-full rounded-3xl shadow-lg border border-neutral-100 p-8 bg-neutral-25">
          <PictureProfile classNameImg="w-16 h-16 lg:w-24 lg:h-24"/>
          <h1 className="text-neutral-800 text-lg font-medium mt-4">Admin</h1>
          <p className="text-neutral-700 text-lg ">email</p>
          <div className="flex justify-between w-full">
            <p>Registered</p>
            <p>10/10/2022</p>
          </div>
          <div className="divider -my-1"/>
          <div className="flex justify-between w-full">
            <p>Role</p>
            <p>{role}</p>
          </div>
        </div>
        <div className="flex flex-col w-1/2 rounded-3xl shadow-lg border border-neutral-100 p-8 bg-neutral-25">
          <ChangePasswordSection/>
        </div>
      </div>
    </AdminLayout>
  )
}

export default DashboardHomeAdmin