import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import DataPenghuni from "../../../../Components/Fragments/Dashboard/Admin/DataPenghuni/DataPenghuni";

const DataPenghuniPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Data Penghuni"/>
    <div>
      <DataPenghuni/>
    </div>
    </HelmetProvider>
  )
}

export default DataPenghuniPage