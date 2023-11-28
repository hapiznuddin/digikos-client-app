import { HelmetProvider } from "react-helmet-async"
import HeadMetaData from "../../../Components/HeadMetaData"
import { useEffect } from "react";
import ProfileLandingPage from "../../../Components/Templates/LandingPage/UserPage/ProfilePage/ProfileSection";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <HelmetProvider>
        <HeadMetaData title="Profile"/>
      <div>
        <ProfileLandingPage/>
      </div>
    </HelmetProvider>
  )
}

export default ProfilePage