import { HelmetProvider } from "react-helmet-async";
import RegisterPage from "../../Components/Fragments/Register/RegistPage";
import HeadMetaData from "../../Components/HeadMetaData";

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
