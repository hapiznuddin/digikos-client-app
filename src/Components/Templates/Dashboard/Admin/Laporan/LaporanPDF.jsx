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


export const LaporanPDF = forwardRef((props, ref) => {
  const token = Cookies.get("token");
  const monthYear = ref.current;

  const [monthly, setMonthly] = useState(null);
  const [yearly, setYearly] = useState(null);

  useEffect(() => {
    if (monthYear && (monthYear.length === 5 || monthYear.length === 6)) {
      let month, year;
      if (monthYear.length === 5) {
        month = monthYear.substring(0, 1);
        setMonthly(month);
        year = monthYear.substring(1);
        setYearly(year);
      } else if (monthYear.length === 6) {
        month = monthYear.substring(0, 2);
        setMonthly(month);
        year = monthYear.substring(2);
        setYearly(year);
      }
    } 
  }, [monthYear]);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseType, setExpenseType] = useState([]);

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

  const dateFormater = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      month: "long",
    }).format(new Date(date));
  };

  const componentPdf = useRef()
  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: `Laporan Keuangan ${dateFormater(monthly)} ${yearly}`,
  })

  return (
    <div className="flex max-w-[210mm] mx-auto relative">
      <ButtonPrimary className="btn w-1/4 font-medium md:text-base absolute right-4 top-12 md:right-16 md:top-12"
        onClick={generatePdf}
      >
        <BiPrinter size={20} />
        Print
      </ButtonPrimary>
      <div className="flex flex-col w-11/12 mx-auto p-12 gap-8" ref={componentPdf}>
        <img src="/digikos.png" alt="" className="w-48" />
        <h1 className="text-neutral-800 text-lg font-medium">
          Laporan Keuangan{" "}
          {monthly === null ? null : `Bulan ${dateFormater(monthly)}`} Tahun {yearly}
        </h1>
        <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
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
        </div>
      </div>
    </div>
  );
});
