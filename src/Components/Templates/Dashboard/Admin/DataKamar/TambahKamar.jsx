import PropTypes from "prop-types";
import InputField from "../../../../Elements/Input";
import SelectNamaKamar from "../../../../Elements/Select/SelectNamaKamar";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {AiOutlineClose, AiOutlineCloseCircle} from "react-icons/ai";
import ButtonPrimary from "../../../../Elements/Button";
import { GoIssueClosed } from "react-icons/go";
import SelectLantai from "../../../../Elements/Select/SelectLantai";
import { useAddDatakamar } from "../../../../../services/dashboard/admin/dataKamar/useAddDatakamar";
import { useGetDataSelectClass } from "../../../../../services/dashboard/admin/dataKamar/useGetDataSelectClass";

const TambahKamar = ({ refetch }) => {
  TambahKamar.propTypes = {
    refetch: PropTypes.func
  };
  const token = Cookies.get("token");
  const [idSelectRoom, setIdSelectRoom] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data, refetch: refetchData } = useGetDataSelectClass({
    token,
    idSelectRoom,
    onSuccess: (data) => {
      formik.setValues({
        class_room_id: data?.data.id,
        number_room: "",
        number_floor: "",
        room_size: data?.data.room_size,
        room_price: data?.data.room_price,
      });
    },
    onError: () => {
    },
  });

  const { mutate } = useAddDatakamar({
    token,
    onSuccess: (data) => {
      console.log(data);
      refetch()
      setIsSuccess(true);
    },
    onError: (data) => {
      console.log(data);
      setIsError(true);
    },
  });

  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      class_room_id: "",
      number_room: "",
      number_floor: "",
      room_size: data?.data?.room_size,
      room_price: data?.data?.room_price,
    },
    onSubmit: async () => {
      const {
        class_room_id,
        number_room,
        number_floor,
        room_size,
        room_price,
      } = formik.values;
      mutate({
        class_room_id,
        number_room,
        number_floor,
        room_size,
        room_price,
      });
    },
    validationSchema: Yup.object({
      class_room_id: Yup.string().required("Nama Kamar Tidak Boleh Kosong"),
      number_room: Yup.string().required("Nomor Kamar Tidak Boleh Kosong"),
      number_floor: Yup.string().required("Lantai Tidak Boleh Kosong"),
      room_size: Yup.string().required("Ukuran Tidak Boleh Kosong"),
      room_price: Yup.number().required("Harga Tidak Boleh Kosong"),
    }),
  });

  useEffect(() => {
    if (idSelectRoom) {
      refetchData();
    }
  }, [idSelectRoom, refetchData]);

  const { class_room_id, number_room, number_floor, room_size, room_price } =
    formik.errors;

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
            <span>Nomor Kamar Tidak Boleh Sama.</span>
            <button  onClick={() => setIsError(false)}>
            <AiOutlineClose size={20}/>
            </button>
          </div>
        </div>): null}
        {isSuccess ? (<div className="toast toast-top toast-end">
          <div className="alert alert-success gap-2">
            <GoIssueClosed size={20}/>
            <span>Kamar Berhasil Ditambahkan.</span>
            <button  onClick={() => setIsSuccess(false)}>
            <AiOutlineClose size={20}/>
            </button>
          </div>
        </div>): null}
        <h1 className="text-neutral-800 text-base lg:text-lg font-semibold">
          Tambah Kamar
        </h1>
        <div className="flex flex-col gap-1">
          <SelectNamaKamar
            label="Nama Kamar"
            name="class_room_id"
            onChange={handleForm}
            value={idSelectRoom}
            onChangeCapture={(e) => setIdSelectRoom(e.target.value)}
          />
          {class_room_id ? (
            <p className="text-error-500 text-xs">{class_room_id}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <InputField
            label="Nomor Kamar"
            name="number_room"
            type="text"
            placeholder="Masukkan nomor kamar"
            onChange={handleForm}
          />
          {number_room ? (
            <p className="text-error-500 text-xs">{number_room}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <SelectLantai
            label="Lantai"
            name="number_floor"
            value={formik.values.number_floor}
            onChange={handleForm}
          />
          {number_floor ? (
            <p className="text-error-500 text-xs">{number_floor}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <InputField
            label="Ukuran"
            name="room_size"
            type="text"
            placeholder="Masukkan ukuran kamar"
            onChange={handleForm}
            value={formik.values.room_size}
          />
          {room_size ? (
            <p className="text-error-500 text-xs">{room_size}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <InputField
            label="Harga"
            name="room_price"
            type="number"
            inputMode="numeric"
            placeholder="Masukkan harga kamar"
            onChange={handleForm}
            value={formik.values.room_price}
          />
          {room_price ? (
            <p className="text-error-500 text-xs">{room_price}</p>
          ) : null}
        </div>
      </div>

      <div className="modal-action flex w-full justify-between">
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
  );
};

export default TambahKamar;
