import { BiPrinter } from "react-icons/bi";
import ButtonPrimary from "../../../../Elements/Button";
import Input from "../../../../Elements/Input/Input";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import SelectMonth from "../../../../Elements/Select/SelectMonth";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetReport } from "../../../../../services/dashboard/admin/laporan/useGetReport";


const Laporan = () => {
  const token = Cookies.get("token");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Ambil bulan saat ini (mulai dari 0)
  const currentYear = currentDate.getFullYear(); // Ambil tahun saat ini

  const [monthly, setMonthly] = useState(currentMonth);
  const [yearly, setYerarly] = useState(currentYear);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseType, setExpenseType] = useState([]);
  const navigate = useNavigate();

  const { isLoading } = useGetReport({
    token,
    monthly,
    yearly,
    onSuccess: (data) => {
      if (data.income.length > 0) {
        setTotalIncome(data.income[0].total_price);
      } else {
        setTotalIncome(0);
      }
      if (data.expense.length > 0) {
        setTotalExpense(data.expense[0].total_price);
      } else {
        setTotalExpense(0);
      }
      if (data.expense.length > 0) {
        setExpenseType(data.expense_category);
      } else {
        setExpenseType([]);
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const totalReport = () => {
    if (totalIncome === 0) {
      return 0;
    }
    const total = totalIncome - totalExpense;
    return total;
  };

  const rupiahFormater = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const renderTable = () => {
    return (
      <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr className="font-medium">
                <th></th>
                <th>Keterangan</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </td>
                </tr>
              ) : (
                <>
                  <tr className="font-semibold text-base">
                    <td>1</td>
                    <td>Pendapatan</td>
                    <td></td>
                  </tr>
                  <tr className="text-base">
                    <td></td>
                    <td>Pendapatan Sewa</td>
                    <td>{rupiahFormater(totalIncome)}</td>
                  </tr>
                  <tr className="font-semibold text-base">
                    <td></td>
                    <td>Total Pendapatan</td>
                    <td>{rupiahFormater(totalIncome)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="h-10"></td>
                  </tr>
                  <tr className="font-semibold text-base">
                    <td>2</td>
                    <td>Pengeluaran</td>
                    <td></td>
                  </tr>
                  {expenseType.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center">
                        Tidak ada pengeluaran
                      </td>
                    </tr>
                  ) : (
                    expenseType.map((expense, index) => (
                      <tr key={index} className="text-base">
                        <td></td>
                        <td>{expense.expense}</td>
                        <td>{rupiahFormater(expense.total_payment)}</td>
                      </tr>
                    ))
                  )}
                  <tr className="font-semibold text-base">
                    <td></td>
                    <td>Total Pengeluaran</td>
                    <td>{rupiahFormater(totalExpense)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="h-10"></td>
                  </tr>
                  <tr className="font-semibold text-base">
                    <td></td>
                    <td>Total Laba Rugi</td>
                    <td>{rupiahFormater(totalReport())}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
    )
  }

  return (
    <AdminLayout title="Laporan">
      <div className="flex flex-col gap-8 bg-neutral-25 px-4 py-8 rounded-xl shadow border border-neutral-100">
        <div className="flex flex-col gap-4 lg:flex-row w-full justify-between lg:items-center">
          <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">
            Laporan Keuangan
          </h1>
          <div className="flex gap-4 w-full lg:max-w-2xl">
            <SelectMonth
              onChange={(e) => setMonthly(e.target.value)}
              value={monthly}
            />
            <Input
              type="number"
              placeholder="Masukan tahun"
              className="w-4/5"
              onChange={(e) => setYerarly(e.target.value)}
              defultValue={yearly}
            />
            <ButtonPrimary className="btn w-1/3 font-medium text-lg"
              onClick={() => {
                navigate(`/admin/dashboard/laporan/print/${monthly}${yearly}`)
              }}
            >
              <BiPrinter size={24} />
              Print
            </ButtonPrimary>
          </div>
        </div>
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
          {renderTable()}
        </div>
      </div>
    </AdminLayout>
  );

};

export default Laporan;
