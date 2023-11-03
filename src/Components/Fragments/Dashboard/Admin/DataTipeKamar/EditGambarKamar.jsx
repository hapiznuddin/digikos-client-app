/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useImageRoomPage } from "../../../../../services/landingPage/roomPage/useImageRoomPage";
import PropTypes from "prop-types";
import { FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import ButtonPrimary from "../../../../Elements/Button";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useAddImageRoom, useDeleteImageRoom, useUpdateImageRoom } from "../../../../../services/dashboard/admin/dataTipeKamar/useImageRoom";

const EditGambarKamar = ({ id }) => {
  EditGambarKamar.PropsTypes = {
    id: PropTypes.number,
  };
  const token = Cookies.get("token");
  const [addPicture, setAddPicture] = useState(null);
  const [editPicture, setEditPicture] = useState(null);
  const [idImg, setIdImg] = useState(null);
  const addImg = useRef();
  const editImg = useRef();

  // * Get Gambar
  const { data, isLoading, refetch } = useImageRoomPage({
    token,
    id,
    onError: (data) => {
      console.log(data);
    },
  });

  // * Tambah Gambar
  const { mutate: addImage, isLoading: isLoadingAdd } = useAddImageRoom({
    token,
    onSuccess: () => {
      refetch();
    },
    onError: (data) => {
      console.log(data);
    },
  });
  const formikAddImg = useFormik({
    initialValues: {
      room_id: id,
      image_room: "",
    },
    onSubmit: async () => {
      if (addPicture) {
        const formData = new FormData();
        formData.append("image_room", addImg.current.files[0]);
        formData.append("room_id", formikAddImg.values.room_id);
        addImage(formData);
      }
    },
  });

  // * Edit Gambar
  const { mutate: editImage, isLoading: isLoadingEdit } = useUpdateImageRoom({
    token,
    onSuccess: () => {
      refetch();
    },
    onError: (data) => {
      console.log(data);
    },
  });
  const formikEditImg = useFormik({
    initialValues: {
      id: idImg,
      room_id: id,
      image_room: "",
    },
    onSubmit: async () => {
      if (editPicture) {
        const formData = new FormData();
        formData.append("image_room", editImg.current.files[0]);
        formData.append("room_id", formikEditImg.values.room_id);
        formData.append("id", idImg);
        editImage(formData);
      }
    },
  });

  // * Delete Gambar
  const { mutate: deleteImage, isLoading: isLoadingDelete } = useDeleteImageRoom({
    token,
    onSuccess: (data) => {
      refetch();
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  return (
    <div className="w-full flex flex-col gap-4">
      
      <div className="flex flex-col md:flex-row w-full justify-between md:items-center">
        <div className="flex flex-col">
          <h1 className="text-neutral-800 mb-4 text-lg md:text-xl font-semibold">
            Edit Gambar Kamar
          </h1>
          <p className="text-xs -mt-3">*Upload gambar ukuran maksimal 4 mb</p>
        </div>
        {isLoadingAdd ? (
          <ButtonPrimary
            className="w-48 text-sm md:text-base font-medium"
            type="button"
            disabled
          >
            <span className="loading loading-spinner loading-lg text-primary-500" />
          </ButtonPrimary>
        ) : (
          <ButtonPrimary
            className="w-48 text-sm md:text-base font-medium"
            type="button"
            onClick={() => addImg.current.click()}
          >
            Tambah Gambar
          </ButtonPrimary>
        )}
      </div>
      <div className="overflow-x-auto bg-neutral-25 rounded-xl shadow border border-neutral-100">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary-50 text-base text-neutral-800">
            <tr>
              <th className="font-medium">No</th>
              <th className="font-medium">Gambar</th>
              <th className="font-medium">Nama File</th>
              <th className="font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="text-center">
                <td colSpan={9}>
                  <span className="loading loading-spinner loading-lg text-primary-500" />
                </td>
              </tr>
            ) : data?.data.length === 0 ? (
              <tr className="text-center font-medium">
                <td colSpan={9}>Tidak Ada Gambar</td>
              </tr>
            ) : (
              data?.data.map((img, index) => {
                const imgRoom = import.meta.env.VITE_DIGIKOS_URL + img.path;
                const onEditClick = (id) => {
                  setIdImg(id); // Mengatur nilai img.id dalam state setIdImg
                  editImg.current.click();
                };
                return (
                  <tr key={index}>
                    <th className="font-medium">{index + 1}</th>
                    <td>
                      <img src={imgRoom} alt="" width={100} />
                    </td>
                    <td>{img.original_name}</td>
                    <td className="w-48">
                      <div className="flex gap-8 font-semibold text-base">
                        {isLoadingEdit ? (
                          <span className="loading loading-spinner loading-lg text-primary-500" />
                        ) : (
                          <button
                            type="button"
                            onClick={() => onEditClick(img.id)}
                          >
                            <div className="tooltip" data-tip="Edit">
                              <FaRegEdit
                                size={24}
                                className="hover:text-primary-500 cursor-pointer"
                              />
                            </div>
                          </button>
                        )}
                        {isLoadingDelete ? (
                          <span className="loading loading-spinner loading-lg text-primary-500" />
                        ) : (
                          <button
                            type="button"
                            onClick={() => deleteImage({ id: img.id })}
                          >
                            <div className="tooltip" data-tip="Hapus">
                              <GoTrash
                                size={24}
                                className="hover:text-primary-500 cursor-pointer"
                              />
                            </div>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <input
        type="file"
        className="hidden"
        accept="image/*"
        name="profile_pic"
        ref={addImg}
        onChangeCapture={(e) => {
          let pic = URL.createObjectURL(e.target.files[0]);
          setAddPicture(pic);
        }}
        onChange={() => {
          formikAddImg.handleSubmit();
        }}
      />

        <input
          type="file"
          className="hidden"
          accept="image/*"
          name="profile_pic"
          ref={editImg}
          onChangeCapture={(e) => {
            let pic = URL.createObjectURL(e.target.files[0]);
            setEditPicture(pic);
          }}
          onChange={() => {
            formikEditImg.handleSubmit();
          }}
        />
      </div>
    </div>
  );
};

export default EditGambarKamar;
