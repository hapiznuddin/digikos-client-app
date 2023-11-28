import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import TambahTipeKamar from "../../../../Components/Templates/Dashboard/Admin/DataTipeKamar/TambahTipeKamar";

const TambahTipeKamarPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Tambah Tipe Kamar"/>
    <div>
      <TambahTipeKamar/>
    </div>
    </HelmetProvider>
  )
}

export default TambahTipeKamarPage