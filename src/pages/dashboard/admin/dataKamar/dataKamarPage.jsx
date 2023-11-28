import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import DataKamar from "../../../../Components/Templates/Dashboard/Admin/DataKamar/DataKamar";

const DataKamarPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Data Kamar"/>
    <div>
      <DataKamar/>
    </div>
    </HelmetProvider>
  )
}

export default DataKamarPage