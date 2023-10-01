import { useRef } from "react";
import { useParams } from "react-router-dom"
import LandingPageLayout from "../../Components/Layouts/LandingPageLayout";
import DetailRoom from "../../Components/Fragments/LandingPage/RoomPage/DetailRoom";
const DetailRoomPage = () => {
  const {id} = useParams();
  const roomRef = useRef(id);
  return (
    <LandingPageLayout>
      <DetailRoom ref={roomRef}/>
    </LandingPageLayout>
  )
}

export default DetailRoomPage