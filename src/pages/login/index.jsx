import { HelmetProvider } from "react-helmet-async";
import LoginPage from "../../Components/Fragments/Login/LoginPage";
import HeadMetaData from "../../Components/HeadMetaData";

const Login = () => {
  return (
    <HelmetProvider>
      <HeadMetaData title="Login"/>
      <div>
        <LoginPage />
      </div>
    </HelmetProvider>
  );
};

export default Login;
