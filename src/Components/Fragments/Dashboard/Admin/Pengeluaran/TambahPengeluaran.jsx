import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai"
import ButtonPrimary from "../../../../Elements/Button"
import InputField from "../../../../Elements/Input"
import { useFormik } from "formik"
import * as Yup from "yup"
import Cookies from "js-cookie"
import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../../../../lib/axios"
import PropTypes from "prop-types"
import { useState } from "react"
import { GoIssueClosed } from "react-icons/go"

const TambahPengeluaran = ({ refetch }) => {
  TambahPengeluaran.propTypes = {
    refetch: PropTypes.func
  }
  const token = Cookies.get("token")
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.post("/expense", body, {headers});
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      refetch
      setIsSuccess(true);
    },
    onError: (data) => {
      console.log(data);
      setIsError(true);
    }
  })

  const formik = useFormik({
    initialValues: {
      expense: "",
      period: "",
      date_paid: "",
      total_payment: 0,
      employee: "",
    },
    onSubmit: async () => {
      const { expense, period, date_paid, total_payment, employee } = formik.values
      mutate({
        expense,
        period,
        date_paid,
        total_payment,
        employee
      })
    },
    validationSchema: Yup.object({
      expense: Yup.string().required("Pengeluaran harus diisi"),
      period: Yup.string().required("Periode harus diisi"),
      date_paid: Yup.string().required("Tanggall pembayaran harus diisi"),
      total_payment: Yup.string().required("Total pembayaran harus diisi"),
      employee: Yup.string().required("Petugas harus diisi"),
    })
  })

  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  }

  const { expense, period, date_paid, total_payment, employee } = formik.errors

  return (
    <div className="modal-box w-11/12 max-w-xl">
      <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><AiOutlineClose size={20}/></button>
    </form>
    <div className="flex flex-col w-full gap-2">
    {isError ? (<div className="toast toast-top toast-end">
          <div className="alert alert-error gap-2">
            <AiOutlineCloseCircle size={20}/>
            <span>Pengeluaran gagal ditambah.</span>
            <button  onClick={() => setIsError(false)}>
            <AiOutlineClose size={20}/>
            </button>
          </div>
        </div>): null}
        {isSuccess ? (<div className="toast toast-top toast-end">
          <div className="alert alert-success gap-2">
            <GoIssueClosed size={20}/>
            <span>Pengeluaran berhasil ditambah.</span>
            <button  onClick={() => setIsSuccess(false)}>
            <AiOutlineClose size={20}/>
            </button>
          </div>
        </div>): null}
      <h1 className="text-neutral-800 text-base lg:text-lg font-semibold mb-2">Tambah Pengeluaran</h1>
      <div className="flex flex-col gap-1">
          <InputField
            label="Pengeluaran"
            name="expense"
            type="text"
            onChange={handleForm}
            placeholder="Masukkan jenis pengeluaran"
          />
          {expense ? (
            <p className="text-error-500 text-xs">{ expense}</p>
          ): null}
      </div>
      <div className="flex flex-col gap-1">
          <InputField
            label="Periode Pengeluaran"
            name="period"
            type="month"
            onChange={handleForm}
          />
          {period ? (
            <p className="text-error-500 text-xs">{period}</p>
          ): null}
      </div>
      <div className="flex flex-col gap-1">
          <InputField
            label="Tanggal Pembayaran"
            name="date_paid"
            type="date"
            onChange={handleForm}
          />
          {date_paid ? (
            <p className="text-error-500 text-xs">{date_paid}</p>
          ): null}
      </div>
      <div className="flex flex-col gap-1">
          <InputField
            label="Total Pembayaran"
            name="total_payment"
            type="number"
            onChange={handleForm}
            placeholder="Masukkan total pembayaran"
          />
          {total_payment ? (
            <p className="text-error-500 text-xs">{total_payment}</p>
          ): null}
      </div>
      <div className="flex flex-col gap-1">
          <InputField
            label="Petugas"
            name="employee"
            type="text"
            onChange={handleForm}
            placeholder="Masukkan petugas"
          />
          {employee ? (
            <p className="text-error-500 text-xs">{employee}</p>
          ): null}
      </div>
    </div>
    <div className="modal-action flex w-full justify-between mt-8">
        <form method="dialog" className="w-1/2">
          <ButtonPrimary className="btn font-medium text-base bg-primary-100 text-primary-600 hover:bg-primary-200 active:bg-primary-300">Batal</ButtonPrimary>
        </form>
        <form method="dialog" className="w-1/2">
          <ButtonPrimary className="btn font-medium text-base" type="submit" onClick={formik.handleSubmit}>
            Simpan
          </ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default TambahPengeluaran