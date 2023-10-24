import { HelmetProvider } from "react-helmet-async"
import { HomeProfile } from "../../../Components/Fragments/Dashboard/User/HomeProfile"
import HeadMetaData from "../../../Components/HeadMetaData"
import { useEffect } from "react"
import Cookies from "js-cookie"

const DashboardUserPage = () => {
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Dashboard User"/>
    <div>
    <HomeProfile/>
    </div>
    </HelmetProvider>
  )
}

export default DashboardUserPage