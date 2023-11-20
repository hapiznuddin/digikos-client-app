import { BiPrinter } from "react-icons/bi"
import ButtonPrimary from "../../../../Elements/Button"
import Input from "../../../../Elements/Input/Input"
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout"
import SelectMonth from "../../../../Elements/Select/SelectMonth"

const Laporan = () => {
  return (
    <AdminLayout title="Laporan">
      <div className="flex flex-col gap-8 bg-neutral-25 px-4 py-8 rounded-xl shadow border border-neutral-100">
        <div className="flex flex-col gap-4 lg:flex-row w-full justify-between lg:items-center">
          <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">Laporan Keuangan</h1>
          <div className="flex gap-4 w-full lg:max-w-2xl">
            <SelectMonth/>
            <Input type="text" placeholder="Masukan tahun" className="w-4/5"/>
            <ButtonPrimary className="btn w-1/3 font-medium text-lg"><BiPrinter size={24}/>Print</ButtonPrimary>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Laporan