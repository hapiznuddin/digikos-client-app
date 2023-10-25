import { HelmetProvider } from "react-helmet-async"
import HeadMetaData from "../../../Components/HeadMetaData"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { HomeProfile } from "../../../Components/Fragments/Dashboard/User/Profile/HomeProfile"

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