import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../Components/HeadMetaData";
import LoginPage from "../../Components/Templates/Login/LoginPage";

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
