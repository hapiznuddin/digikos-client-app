import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useGetProfile } from "../../../../services/landingPage/userPage/useGetProfile";
import Cookies from "js-cookie";
import { useIdOccupantStore, useStatusInfoRentStore } from "../../../../lib/idClassRoom";
import { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";

const OccupantInformation = () => {
  const token = Cookies.get("token");
  const [error, setError] = useState(false);

  const { data, isLoading } = useGetProfile({
    token,
    onError: () => {
      if (data?.data === undefined) {
        setError(true);
      }
    },
  });
  const setId = useIdOccupantStore((state) => state.setId);
  useEffect(() => {
    setId(data?.data.id);
  }, [data, setId]);

  const setStatusOccupant = useStatusInfoRentStore((state) => state.setStatus);
  useEffect(() => {
    setStatusOccupant(error);
  }, [error, setStatusOccupant]);

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-neutral-800 text-lg md:text-xl lg:text-2xl font-semibold">
            Informasi Penyewa
          </h1>
          {error ? (
            <p className="text-error-500 text-sm font-medium italic">
              Harap isi profil terlebih dahulu
            </p>
          ) : null}
        </div>
        <Link to="/user/profil">
          <button className="btn btn-ghost btn-sm rounded-full text-sm md:text-base gap-1 text-neutral-600 normal-case hover:bg-primary-50 hover:text-primary-500">
            <BiEdit size={20} />
            Edit Profil
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-neutral-700 text-lg font-semibold">
            Nama Penyewa
          </h1>
          {isLoading ? (
            <Skeleton className="w-28 h-5" />
          ) : error ? (
            <h1 className="text-error-500 text-sm font-medium italic">
              Data tidak ada
            </h1>
          ) : (
            <h1 className="text-neutral-500 text-base font-medium">
              {data?.data.name}
            </h1>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-neutral-700 text-lg font-semibold">Nomor HP</h1>
          {isLoading ? (
            <Skeleton className="w-40 h-5" />
          ) : error ? (
            <h1 className="text-error-500 text-sm font-medium italic">
              Data tidak ada
            </h1>
          ) : (
            <h1 className="text-neutral-500 text-base font-medium">
              {data?.data.phone}
            </h1>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-neutral-700 text-lg font-semibold">Alamat</h1>
          {isLoading ? (
            <Skeleton className="w-56 h-5" />
          ) : error ? (
            <h1 className="text-error-500 text-sm font-medium italic">
              Data tidak ada
            </h1>
          ) : (
            <h1 className="text-neutral-500 text-base font-medium">
              {data?.data.address}
            </h1>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-neutral-700 text-lg font-semibold">
            Jenis Kelamin
          </h1>
          {isLoading ? (
            <Skeleton className="w-28 h-5" />
          ) : error ? (
            <h1 className="text-error-500 text-sm font-medium italic">
              Data tidak ada
            </h1>
          ) : (
            <h1 className="text-neutral-500 text-base font-medium">
              {data?.data.gender}
            </h1>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-neutral-700 text-lg font-semibold">Pekerjaan</h1>
          {isLoading ? (
            <Skeleton className="w-28 h-5" />
          ) : error ? (
            <h1 className="text-error-500 text-sm font-medium italic">
              Data tidak ada
            </h1>
          ) : (
            <h1 className="text-neutral-500 text-base font-medium">
              {data?.data.occupation}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default OccupantInformation;
