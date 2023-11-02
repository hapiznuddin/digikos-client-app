import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import DataTipeKamar from "../../../../Components/Fragments/Dashboard/Admin/DataTipeKamar/DataTipeKamar";

const DataTipeKamarPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Data Tipe Kamar"/>
    <div>
      <DataTipeKamar/>
    </div>
    </HelmetProvider>
  )
}


export default DataTipeKamarPage