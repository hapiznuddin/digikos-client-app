import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { IoCheckmarkCircleOutline, IoImagesOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { useIdOccupantStore } from "../../../../lib/idClassRoom";
import { useUploadKTP } from "../../../../services/landingPage/rentPage/useUploadKTP";
import { useGetKTP } from "../../../../services/landingPage/rentPage/useGetKTP";
import { useUploadKK } from "../../../../services/landingPage/rentPage/useUploadKK";
import { useGetKK } from "../../../../services/landingPage/rentPage/useGetKK";
import { Skeleton } from "@chakra-ui/react";

const RequirementDocument = () => {
  const token = Cookies.get("token");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgressKK, setUploadProgressKK] = useState(0);
  const id = useIdOccupantStore((state) => state.id);

  const [ktp, setKtp] = useState(false);
  const [ktpPicture, setKtpPicture] = useState(null);
  const ktpImg = useRef();

  const [kk, setKk] = useState(false);
  const [kkPicture, setKkPicture] = useState(null);
  const kkImg = useRef();

  // * KTP
  const formikKtp = useFormik({
    initialValues: {
      ktp_file: "",
    },
    onSubmit: async () => {
      if (ktpPicture) {
        const formData = new FormData();
        formData.append("ktp_file", ktpImg.current.files[0]);
        uploadKtpFile(formData);
        // if (status === 200) {
        //   updateProfilePic(formData);
        // } else {
        //   mutate(formData);
        // }
      }
    },
  });

  const { mutate: uploadKtpFile, isSuccess: isSuccessKtp } = useUploadKTP({
    token,
    setUploadProgress,
    onSuccess: () => {
      refetchKtpFile();
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const { data: getKtpFile, isLoading: isLoadingKtp, refetch: refetchKtpFile } = useGetKTP({
    id,
    token,
    onError: () => {
      refetchKtpFile();
    },
  });

  // * KK
  const formikKK = useFormik({
    initialValues: {
      family_doc: "",
    },
    onSubmit: async () => {
      if (ktpPicture) {
        const formData = new FormData();
        formData.append("family_doc", kkImg.current.files[0]);
        uploadKKFile(formData);
        // if (status === 200) {
        //   updateProfilePic(formData);
        // } else {
        //   mutate(formData);
        // }
      }
    },
  });

  const { mutate: uploadKKFile, isSuccess: isSuccessKK } = useUploadKK({
    token,
    setUploadProgressKK,
    onSuccess: () => {
      refetchKKFile();
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const { data: getKKFile, isLoading: isLoadingKK, refetch: refetchKKFile } = useGetKK({
    id,
    token,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      refetchKtpFile();
    },
  });

  const imgKtpFile = `${import.meta.env.VITE_DIGIKOS_URL}${
    getKtpFile?.data.path
  }`;

  useEffect(() => {
    if (getKtpFile === undefined ) {
      setKtp(false);
    } else {
      setKtp(true);
    }
  }, [getKtpFile]);

  const imgKKFile = `${import.meta.env.VITE_DIGIKOS_URL}${
    getKKFile?.data.path
  }`;

  useEffect(() => {
    if (getKKFile === undefined) {
      setKk(false);
    } else {
      setKk(true);
    }
  }, [getKKFile]);


  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-neutral-800 text-lg md:text-xl lg:text-2xl font-semibold">
        Dokumen persyaratan masuk kost
      </h1>
      <div className="flex flex-col md:flex-row w-full justify-start items-center gap-8">

        {/* Upload KTP */}
        <div className="flex flex-col gap-4 items-center relative">
          <div className="flex w-60 h-40 bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-xl justify-center items-center">
            {ktp ? (<>
              {isLoadingKtp ? (<Skeleton className="w-60 h-40 absolute rounded-xl"/>) : null }
              <img src={imgKtpFile} className="w-full h-full rounded-xl" />
            </>
            ) : ktpPicture ? (
              <img src={ktpPicture} className="w-full h-full rounded-xl" />
            ) : (
              <div
                className="flex flex-col gap-2 rounded-xl justify-center items-center w-full h-full cursor-pointer hover:text-neutral-400"
                onClick={() => ktpImg.current.click()}
              >
                <IoImagesOutline size={32} />
                Upload disini
              </div>
            )}
            <input
              ref={ktpImg}
              type="file"
              accept="image/*"
              className="hidden"
              onChangeCapture={(e) => {
                let ktp = URL.createObjectURL(e.target.files[0]);
                setKtpPicture(ktp);
              }}
              onChange={() => {
                formikKtp.handleSubmit();
              }}
            />
          </div>
          <p className="text-neutral-700 text-lg font-medium">Foto KTP</p>
          {isSuccessKtp ? (
            <div className="absolute top-10">
              <div className="flex flex-col items-center gap-1">
              <IoCheckmarkCircleOutline size={48} className="text-neutral-25" />
              <p className="text-neutral-25 text-sm">Upload Berhasil</p>
              </div>
            </div>
          ): uploadProgress > 0 ? (
            <div
              className="radial-progress text-primary-800 absolute top-10"
              style={{
                "--value": uploadProgress,
                "--size": "70px",
                "--thickness": "5px",
              }}
            >
              {uploadProgress}%
            </div>
          ) : null}
        </div>

        {/* Upload KK */}
        <div className="flex flex-col gap-4 items-center relative">
          <div className="flex w-60 h-40 bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-xl justify-center items-center">
            {kk ? (<>
              {isLoadingKK ? (<Skeleton className="w-60 h-40 absolute rounded-xl"/>) : null }
              <img src={imgKKFile} className="w-full h-full rounded-xl" />
            </>
            ) : (
              kkPicture ? (
                <img src={kkPicture} className="w-full h-full rounded-xl" />
              ) : (
                <div
                className="flex flex-col gap-2 rounded-xl justify-center items-center w-full h-full cursor-pointer hover:text-neutral-400"
                onClick={() => kkImg.current.click()}
                >
                  <IoImagesOutline size={32} />
                  Upload disini
                </div>
              )
            )}
            <input
              ref={kkImg}
              type="file"
              accept="image/*"
              className="hidden"
              onChangeCapture={(e) => {
                let kk = URL.createObjectURL(e.target.files[0]);
                setKkPicture(kk);
              }}
              onChange={() => {
                formikKK.handleSubmit();
              }}
            />
          </div>
          <p className="text-neutral-700 text-lg font-medium">
            Foto Kartu Keluarga (Opsional)
          </p>
          {isSuccessKK ? (
            <div className="absolute top-10">
              <div className="flex flex-col items-center gap-1">
              <IoCheckmarkCircleOutline size={48} className="text-neutral-25" />
              <p className="text-neutral-25 text-sm">Upload Berhasil</p>
              </div>
            </div>
          ): uploadProgress > 0 ? (
            <div
              className="radial-progress text-primary-800 absolute top-10"
              style={{
                "--value": uploadProgressKK,
                "--size": "70px",
                "--thickness": "5px",
              }}
            >
              {uploadProgressKK}%
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RequirementDocument;
