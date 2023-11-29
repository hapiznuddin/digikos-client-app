import { PiUserFill } from "react-icons/pi"
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout"
import { FaHouseUser } from "react-icons/fa"
import { MdAddHome } from "react-icons/md"
import { TbHome } from "react-icons/tb"
import InvoiceTable from "./InvoiceTable"

const DashboardHomeAdmin = () => {
  return (
    <AdminLayout title="Dashboard Admin">
      <div className="flex flex-col w-full h-full gap-4 md:gap-6 rounded-3xl shadow-lg border border-neutral-100 p-8 bg-neutral-25">
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6">
          <div className="flex flex-col justify-center w-full md:w-1/2 h-32 rounded-3xl p-8 bg-purple relative overflow-hidden">
            <h1 className="text-neutral-25 text-2xl font-medium">10</h1>
            <p className="text-neutral-25 text-lg font-medium">Total Penghuni</p>
            <PiUserFill  className="absolute -bottom-4 -right-7 text-[#6F3E9A] text-8xl md:text-9xl"/>
          </div>
          <div className="flex flex-col justify-center p-8 w-full md:w-1/2 h-32 rounded-3xl bg-orange relative overflow-hidden">
          <h1 className="text-neutral-25 text-2xl font-medium">10</h1>
            <p className="text-neutral-25 text-lg font-medium">Kamar Terisi</p>
            <FaHouseUser className="absolute -bottom-3 -right-6 text-[#CE8600] text-8xl md:text-9xl"/>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6">
          <div className="flex flex-col justify-center w-full md:w-1/2 h-32 rounded-3xl p-8 bg-tosca relative overflow-hidden">
            <h1 className="text-neutral-25 text-2xl font-medium">10</h1>
            <p className="text-neutral-25 text-lg font-medium">Kamar Kosong</p>
            <MdAddHome className="absolute -bottom-2 -right-2 text-[#089A95] text-8xl md:text-9xl"/>
          </div>
          <div className="flex flex-col justify-center p-8 w-full md:w-1/2 h-32 rounded-3xl bg-cyan relative overflow-hidden">
          <h1 className="text-neutral-25 text-2xl font-medium">10</h1>
            <p className="text-neutral-25 text-lg font-medium">Total Kamar</p>
            <TbHome className="absolute -bottom-3 -right-6 text-[#037DB2] text-8xl md:text-9xl"/>
          </div>
        </div>
      </div>
        <InvoiceTable/>
    </AdminLayout>
  )
}

export default DashboardHomeAdmin