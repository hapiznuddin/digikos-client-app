import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai"
import ButtonPrimary from "../../../../Elements/Button"
import InputField from "../../../../Elements/Input"
import PropTypes from "prop-types"
import Cookies from "js-cookie"
import { useFormik } from "formik"
import { useState } from "react"
import { GoIssueClosed } from "react-icons/go"
import { useCreateInvoice } from "../../../../../services/dashboard/admin/invoice/useCreateInvoice"

const CreateInvoice = ({refetching}) => {
  CreateInvoice.propTypes = {
    refetching: PropTypes.func
  }
  const token = Cookies.get("token")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const {mutate, isLoading} = useCreateInvoice({
    token,
    onSuccess: () => {
      refetching()
      setIsSuccess(true)
    },
    onError: () => {
      setIsError(true)
    },
  })

  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  }

  const formik = useFormik({
    initialValues: {
      date: "",
    },
    onSubmit: async () => {
      mutate({
        date: formik.values.date
      })
    }
  })

  return (
    <div className="modal-box w-11/12 max-w-xl p-12 flex flex-col justify-center items-center">
      <div className="toast toast-center">
        {isSuccess ? (<div className="alert alert-success gap-2">
          <GoIssueClosed size={20} />
          <span>Tagihan berhasil dibuat</span>
          <button onClick={() => setIsSuccess(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>): null}
        {isError ? (<div className="alert alert-error gap-2">
          <AiOutlineCloseCircle size={20} />
          <span>Tagihan sudah ada</span>
          <button onClick={() => setIsError(false)}>
            <AiOutlineClose size={20} />
          </button>
        </div>): null}
      </div>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <AiOutlineClose size={20} />
        </button>
      </form>
      <h1 className="text-neutral-800 text-xl lg:text-2xl font-semibold mb-4">
        Buat Tagihan Baru
      </h1>
      <form className="w-full">
        <div className="flex flex-col gap-8 w-full">
            <InputField
              type="date"
              label="Tanggal Jatuh Tempo"
              name="date"
              classNameLabel="md:text-base"
              onChange={handleForm}
            />
          <div className="modal-action flex flex-col-reverse md:flex-row gap-4 mt-2 lg:gap-2 w-full">
            <form method="dialog" className="w-full ">
              <ButtonPrimary className="w-full text-lg font-medium bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 active:text-neutral-25 active:bg-primary-300">
                Batal
              </ButtonPrimary>
            </form>
            <form method="dialog" className="flex w-full">
              <ButtonPrimary
                className="w-full text-lg font-medium"
                type={"button"}
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                {isLoading ? (
                <span className="loading loading-infinity loading-md"></span>
                ) : (
                  "Simpan"
                )}
              </ButtonPrimary>
            </form>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateInvoice