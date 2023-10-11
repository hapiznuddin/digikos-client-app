import { useRef, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";

const RequirementDocument = () => {
  const [ktpPicture, setKtpPicture] = useState(null);
  const [kkPicture, setKkPicture] = useState(null);
  const ktpImg = useRef();
  const kkImg = useRef();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-neutral-800 text-lg md:text-xl lg:text-2xl font-semibold">
        Dokumen persyaratan masuk kost
      </h1>
      <div className="flex flex-col md:flex-row w-full justify-start items-center gap-8">

        {/* Upload KTP */}
        <div className="flex flex-col gap-4 items-center">
          <div className="flex w-60 h-40 bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-xl justify-center items-center">
            {ktpPicture ? (
              <img src={ktpPicture} className="w-full h-full rounded-xl" />
            ) : (
              <div className="flex flex-col gap-2 rounded-xl justify-center items-center w-full h-full cursor-pointer hover:text-neutral-400" onClick={() => ktpImg.current.click()}>
                <IoImagesOutline size={32} />
                Upload disini
              </div>
            )}
            <input
              ref={ktpImg}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                let ktp = URL.createObjectURL(e.target.files[0]);
                setKtpPicture(ktp);
              }}
            />
          </div>
          <p className="text-neutral-700 text-lg font-medium">Foto KTP</p>
        </div>

        {/* Upload KK */}
        <div className="flex flex-col gap-4 items-center">
          <div className="flex w-60 h-40 bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-xl justify-center items-center">
            {kkPicture ? (
              <img src={kkPicture} className="w-full h-full rounded-xl" />
            ) : (
              <div className="flex flex-col gap-2 rounded-xl justify-center items-center w-full h-full cursor-pointer hover:text-neutral-400" onClick={() => kkImg.current.click()}>
                <IoImagesOutline size={32} />
                Upload disini
              </div>
            )}
            <input
              ref={kkImg}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                let kk = URL.createObjectURL(e.target.files[0]);
                setKkPicture(kk);
              }}
            />
          </div>
          <p className="text-neutral-700 text-lg font-medium">Foto Kartu Keluarga (Opsional)</p>
        </div>
      </div>
    </div>
  );
};

export default RequirementDocument;
