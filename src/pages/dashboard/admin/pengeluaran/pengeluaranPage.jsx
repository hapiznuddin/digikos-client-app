import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import Pengeluaran from "../../../../Components/Fragments/Dashboard/Admin/Pengeluaran/Pengeluaran";

const PengeluaranPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Pengeluaran"/>
    <div>
      <Pengeluaran/>
    </div>
    </HelmetProvider>
  )
}

export default PengeluaranPage