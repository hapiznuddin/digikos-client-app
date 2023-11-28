import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Laporan from "../../../../Components/Templates/Dashboard/Admin/Laporan/Laporan";

const LaporanPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="laporan"/>
    <div>
      <Laporan/>
    </div>
    </HelmetProvider>
  )

}

export default LaporanPage