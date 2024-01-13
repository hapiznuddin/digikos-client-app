import { BiPrinter } from "react-icons/bi";
import ButtonPrimary from "../../../../Elements/Button";
import Input from "../../../../Elements/Input/Input";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import SelectMonth from "../../../../Elements/Select/SelectMonth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetReport } from "../../../../../services/dashboard/admin/laporan/useGetReport";
import { useGetReportPenyewa } from "../../../../../services/dashboard/admin/laporan/useGetReportPenyewa";


const Laporan = () => {
  const token = Cookies.get("token");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Ambil bulan saat ini (mulai dari 0)
  const currentYear = currentDate.getFullYear(); // Ambil tahun saat ini

  const [monthly, setMonthly] = useState(currentMonth);
  const [yearly, setYerarly] = useState(currentYear);
  const [totalIncome, setTotalIncome] = useState(0);
  const [paymentIncome, setPaymentIncome] = useState(0);
  const [totalNewIncome, setTotalNewincome] = useState(0);
  const [paymentNewIncome, setPaymentNewIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseType, setExpenseType] = useState([]);
  
  const [totalPendapatan, setTotalPendapatan] = useState(0);

  const navigate = useNavigate();

  const { isLoading } = useGetReport({
    token,
    monthly,
    yearly,
    onSuccess: (data) => {
      if (data.income.length > 0) {
        setTotalIncome(data.income[0].total_payment);
      } else {
        setTotalIncome(0);
      }
      if (data.income.length > 0) {
        setPaymentIncome(data.income[0].total_price);
      } else {
        setPaymentIncome(0);
      }

      if (data.new_income.length > 0) {
        setTotalNewincome(data.new_income[0].total_pay);
      } else {
        setTotalNewincome(0);
      }
      if (data.new_income.length > 0) {
        setPaymentNewIncome(data.new_income[0].total_payment);
      } else {
        setPaymentNewIncome(0);
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

  useEffect(() => {
    setTotalPendapatan(parseInt(paymentIncome) + parseInt(paymentNewIncome));
  }, [paymentIncome, paymentNewIncome]);

  const totalReport = () => {
    if (totalPendapatan === 0) {
      return 0;
    }
    const total = totalPendapatan - totalExpense;
    return total;
  };

  const {data, isLoading: isLoadingPenyewa } = useGetReportPenyewa({
    token,
    monthly,
    yearly,
    onError: (data) => {
      console.log(data);
    },
  });

  const rupiahFormater = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const dateFormatter = (date) => {
    const option = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(date).toLocaleDateString("id-ID", option);
  }

  const renderTable = () => {
    return (
      <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr className="font-medium">
                <th></th>
                <th colSpan={2}>Keterangan</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </td>
                </tr>
              ) : (
                <>
                  <tr className="font-semibold text-base">
                    <td>1</td>
                    <td colSpan={2}>Pendapatan</td>
                    <td></td>
                  </tr>
                  <tr className="text-base">
                    <td></td>
                    <td colSpan={2}>{totalIncome} Pembayaran Sewa</td>
                    <td>{rupiahFormater(paymentIncome)}</td>
                  </tr>
                  <tr className="text-base">
                    <td></td>
                    <td colSpan={2}>{totalNewIncome} Penghuni Baru</td>
                    <td>{rupiahFormater(paymentNewIncome)}</td>
                  </tr>
                  <tr className="font-semibold text-base">
                    <td></td>
                    <td colSpan={2}>Total Pendapatan</td>
                    <td>{rupiahFormater(totalPendapatan)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="h-10"></td>
                  </tr>
                  <tr className="font-semibold text-base">
                    <td>2</td>
                    <td colSpan={2}>Pengeluaran</td>
                    <td></td>
                  </tr>
                  {expenseType.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        Tidak ada pengeluaran
                      </td>
                    </tr>
                  ) : (
                    expenseType.map((expense, index) => (
                      <tr key={index} className="text-base">
                        <td></td>
                        <td className="w-56">{expense.expense}</td>
                        <td> {dateFormatter(expense.date_paid)}</td>
                        <td>{rupiahFormater(expense.total_payment)}</td>
                      </tr>
                    ))
                  )}
                  <tr className="font-semibold text-base">
                    <td></td>
                    <td colSpan={2}>Total Pengeluaran</td>
                    <td>{rupiahFormater(totalExpense)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="h-10"></td>
                  </tr>
                  <tr className="font-semibold text-base">
                    <td></td>
                    <td colSpan={2}>Total Laba Rugi</td>
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
                navigate(`/admin/dashboard/laporan/print/${monthly}&${yearly}`)
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

          <h1 className="text-neutral-800 text-lg md:text-xl font-semibold">
            Rekap Penyewaan
          </h1>
          <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr className="font-medium">
                <th></th>
                <th>Nama</th>
                <th>Tipe Kamar</th>
                <th>Nomor Kamar</th>
                <th>Tanggal Check-in</th>
              </tr>
            </thead>
            <tbody className="text-base">
              { isLoadingPenyewa ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </td>
                </tr>
              ) : data?.data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    Tidak Ada Penyewa Baru
                  </td>
                </tr>
              ) :
              data?.data.map((data, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data.occupant}</td>
                  <td>{data.room_name}</td>
                  <td>lantai {data.floor} Nomor {data.number_room}</td>
                  <td>{dateFormatter(data.start_date)}</td>
                </tr>
              ))}
            </tbody>
            </table>
        </div>
      </div>
    </AdminLayout>
  );

};

export default Laporan;
