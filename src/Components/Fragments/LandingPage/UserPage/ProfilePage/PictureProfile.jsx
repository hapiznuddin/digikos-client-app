/* eslint-disable react/display-name */
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { usePostProfilePic } from "../../../../../services/landingPage/userPage/usePostProfilePic";
import { useUpdateProfilePic } from "../../../../../services/landingPage/userPage/useUpdateProfilePic";
import { useGetProfilePic } from "../../../../../services/landingPage/userPage/useGetProfilePic";

const PictureProfile = () => {
  const token = Cookies.get("token");
  const img = useRef();
  const [picture, setPicture] = useState(null);
  const [status, setStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { mutate } = usePostProfilePic({
    token,
    setUploadProgress,
    onSuccess: (data) => {
      console.log(data);
      setUploadProgress(0);
      refetch();
    },
  });

  const { mutate: updateProfilePic } = useUpdateProfilePic({
    token,
    setUploadProgress,
    onSuccess: (data) => {
      console.log(data);
      setUploadProgress(0);
      refetch();
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const formik = useFormik({
    initialValues: {
      profile_pic: "",
    },
    onSubmit: async () => {
      if (picture) {
        const formData = new FormData();
        formData.append("profile_pic", img.current.files[0]);
        if (status === 200) {
          updateProfilePic(formData);
        } else {
          mutate(formData);
        }
      }
    },
  });

  const { data, isLoading, refetch } = useGetProfilePic({
    token,
    onSuccess: (data) => {
      setStatus(data.status);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const profilePic = `${import.meta.env.VITE_DIGIKOS_URL}${data?.data.path}`;
  return (
    <div className="flex flex-col bg-neutral-200 w-24 h-24 lg:w-32 lg:h-32 rounded-full relative mt-4">
      {isLoading ? (
        <img
          src={"https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}
          className="w-full h-full rounded-full"
        />
      ) : (
        <img
          src={
            picture
              ? picture
              : profilePic
              ? profilePic
              : "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
          }
          className="w-full h-full rounded-full"
        />
      )}
      <div
        className="absolute bottom-1 right-0 bg-neutral-25 shadow w-9 h-9 rounded-full flex justify-center items-center z-10 cursor-pointer"
        onClick={() => img.current.click()}
      >
        <IoCameraOutline size={24} />
      </div>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        name="profile_pic"
        ref={img}
        onChangeCapture={(e) => {
          let pic = URL.createObjectURL(e.target.files[0]);
          setPicture(pic);
        }}
        onChange={() => {
          formik.handleSubmit();
        }}
      />
      {uploadProgress > 0 ? (
        <div
          className="radial-progress text-primary-500 w-full h-full  absolute"
          style={{ "--value": uploadProgress }}
        >
          {uploadProgress}%
        </div>
      ) : null}
    </div>
  );
};

export default PictureProfile;
