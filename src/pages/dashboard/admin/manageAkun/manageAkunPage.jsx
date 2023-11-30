import Cookies from "js-cookie";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../../Components/HeadMetaData";
import ManageAkun from "../../../../Components/Templates/Dashboard/Admin/ManageAkun/ManageAkun";

const ManageAkunPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Managemen Akun"/>
    <div>
      <ManageAkun/>
    </div>
    </HelmetProvider>
  )

}

export default ManageAkunPage