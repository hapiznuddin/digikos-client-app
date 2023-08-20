import { Helmet, HelmetProvider } from "react-helmet-async";

const Register = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Register | Digikos</title>
      </Helmet>
      <div>
      </div>
    </HelmetProvider>
  );
};

export default Register;
