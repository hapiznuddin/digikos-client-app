import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../../Components/HeadMetaData";
import Cookies from "js-cookie";
import { useEffect } from "react";
import DashboardHomeAdmin from "../../../Components/Fragments/Dashboard/Admin/DahsboardHome/DashboardHomeAdmin";

const HomeDashboardPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Dashboard Admin"/>
    <div>
      <DashboardHomeAdmin/>
    </div>
    </HelmetProvider>
  )
}

export default HomeDashboardPage