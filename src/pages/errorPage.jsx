import { HelmetProvider } from "react-helmet-async"
import HeadMetaData from "../Components/HeadMetaData"
import NotFoundPage from "../Components/Fragments/NotFoundPage/NotFoundPage"

const ErrorPage = () => {
  return(
    <HelmetProvider>
    <HeadMetaData title="Not Found"/>
    <div>
      <NotFoundPage/>
    </div>
    </HelmetProvider>
  )
}

export default ErrorPage