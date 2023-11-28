import { HelmetProvider } from "react-helmet-async"
import HeadMetaData from "../../Components/HeadMetaData"
import WebhookMidtrans from "../../Components/Templates/LandingPage/WebhookMidtrans"

const WebhookMidtransPage = () => {
  return (
    <HelmetProvider>
    <HeadMetaData title="Notifikasi Midtrans"/>
    <div>
      <WebhookMidtrans/>
    </div>
    </HelmetProvider>
  )
}

export default WebhookMidtransPage