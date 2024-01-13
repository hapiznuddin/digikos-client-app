/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { useGetReport } from "../../../../../services/dashboard/admin/laporan/useGetReport";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import ButtonPrimary from "../../../../Elements/Button";
import { BiPrinter } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useGetReportPenyewa } from "../../../../../services/dashboard/admin/laporan/useGetReportPenyewa";

export const LaporanPDF = forwardRef((props, ref) => {
  const token = Cookies.get("token");
  const monthYear = ref.current;
  console.log(monthYear);

  const [monthly, setMonthly] = useState(null);
  const [yearly, setYearly] = useState(null);

  useEffect(() => {
    if(monthYear) {
      const splitRef = monthYear.split("&");
      setMonthly(splitRef[0]);
      setYearly(splitRef[1]);
    }
    // if (monthYear && (monthYear.length === 5 || monthYear.length === 6)) {
    //   let month, year;
    //   if (monthYear.length === 5) {
    //     month = monthYear.substring(0, 1);
    //     setMonthly(month);
    //     year = monthYear.substring(1);
    //     setYearly(year);
    //   } else if (monthYear.length === 6) {
    //     month = monthYear.substring(0, 2);
    //     setMonthly(month);
    //     year = monthYear.substring(2);
    //     setYearly(year);
    //   }
    // }
  }, [monthYear]);

  console.log(monthly, yearly);

  const [totalIncome, setTotalIncome] = useState(0);
  const [paymentIncome, setPaymentIncome] = useState(0);
  const [totalNewIncome, setTotalNewincome] = useState(0);
  const [paymentNewIncome, setPaymentNewIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseType, setExpenseType] = useState([]);
  const [totalPendapatan, setTotalPendapatan] = useState(0);

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
    setTotalPendapatan(paymentIncome + paymentNewIncome);
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

  const monthFormatter = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      month: "long",
    }).format(new Date(date));
  };

  const dateFormatter = (date) => {
    const option = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(date).toLocaleDateString("id-ID", option);
  }

  const componentPdf = useRef();
  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: `Laporan Keuangan ${monthly ? 'Bulan ' + monthFormatter(monthly) : ""} ${yearly}`,
  });

  return (
    <div className="flex max-w-[210mm] mx-auto relative">
      <ButtonPrimary
        className="btn w-1/4 font-medium md:text-base absolute right-4 top-12 md:right-16 md:top-12"
        onClick={generatePdf}
      >
        <BiPrinter size={20} />
        Print
      </ButtonPrimary>
      <div
        className="flex flex-col w-11/12 mx-auto p-12 gap-4"
        ref={componentPdf}
      >
        <img src="/digikos.png" alt="" className="w-48" />
        <h1 className="text-neutral-800 text-lg mt-4 font-medium">
          Laporan Keuangan{" "}
          {monthly === null ? null : `${monthly ? 'Bulan ' + monthFormatter(monthly) : ""}`} Tahun{" "}
          {yearly}
        </h1>
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
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
                  <tr className="font-semibold  text-sm">
                    <td>1</td>
                    <td colSpan={2}>Pendapatan</td>
                    <td></td>
                  </tr>
                  <tr className="text-sm">
                    <td></td>
                    <td colSpan={2}>{totalIncome} Pembayaran Sewa</td>
                    <td>{rupiahFormater(paymentIncome)}</td>
                  </tr>
                  <tr className="text-sm">
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
                      <tr key={index} className="text-sm">
                        <td></td>
                        <td className="w-40">{expense.expense}</td>
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
                    <td ></td>
                    <td colSpan={2}>Total Laba Rugi</td>
                    <td>{rupiahFormater(totalReport())}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <h1 className="text-neutral-800 text-lg mt-4 font-medium">
          Rekap Penyewaan{" "}
          {monthly === null ? null : `${monthly ? 'Bulan ' + monthFormatter(monthly) : ""}`} Tahun{" "}
          {yearly}
        </h1>
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-primary-50 text-base text-neutral-800">
              <tr className="font-medium text-sm">
                <th></th>
                <th>Nama</th>
                <th>Tipe Kamar</th>
                <th>Nomor Kamar</th>
                <th>Tanggal Check-in</th>
              </tr>
            </thead>
            <tbody className="text-sm">
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
    </div>
  );
});
