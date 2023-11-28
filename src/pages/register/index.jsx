import { HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../Components/HeadMetaData";
import RegisterPage from "../../Components/Templates/Register/RegistPage";

const Register = () => {
  return (
    <HelmetProvider>
      <HeadMetaData title="Register"/>
      <div>
      </div>
      <RegisterPage/>
    </HelmetProvider>
  );
};

export default Register;
