import { Helmet } from "react-helmet";
import LoginPage from "../../Components/Fragments/Login/LoginPage";

const Login = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login | Digikos</title>
      </Helmet>
      <div>
        <LoginPage />
      </div>
    </div>
  );
};

export default Login;
