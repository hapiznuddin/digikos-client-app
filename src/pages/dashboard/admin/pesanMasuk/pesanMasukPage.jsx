import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import PesanMasuk from "../../../../Components/Templates/Dashboard/Admin/PesanMasuk/PesanMasuk";

const PesanMasukPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Pesan Masuk"/>
    <div>
      <PesanMasuk/>
    </div>
    </HelmetProvider>
  )
}

export default PesanMasukPage