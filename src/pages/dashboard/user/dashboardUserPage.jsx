import { HelmetProvider } from "react-helmet-async"
import HeadMetaData from "../../../Components/HeadMetaData"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { useParams } from "react-router-dom"
import { useRef } from "react"
import HomeDashboardUser from "../../../Components/Fragments/Dashboard/User/UserHome/HomeDashboardUser"

const DashboardUserPage = () => {
  const token = Cookies.get("token");
  const {id} = useParams();
  const idRef = useRef(id);

  useEffect(() => {
    if (token === undefined) {
      window.location.href = "/";
    }
  }, [token]);
  return (
  <HelmetProvider>
    <HeadMetaData title="Dashboard User"/>
    <div>
    {/* <HomeProfile ref={idRef}/> */}
    <HomeDashboardUser ref={idRef}/>
    </div>
    </HelmetProvider>
  )
}

export default DashboardUserPage