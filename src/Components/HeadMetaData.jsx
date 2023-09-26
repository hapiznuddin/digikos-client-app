import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const HeadMetaData = ({ title }) => {
  HeadMetaData.propTypes = {
    title: PropTypes.string,
  };
  const defaultTitle = "Digikos";
  const description =
    "Digikos adalah sebuah webiste yang bertujuan untuk mempermudah pencarian kos atau tempat tinggal bagi para mahasiswa atau pekerja yang sedang mencari tempat tinggal sementara. Digikos juga membuat pemilik kost dapat mengelola kamar kost dengan mudah.";
  const metaImage = { src: "/digikos.png" };

  // const baseUrl = "http://localhost:5173";
  return (
    <Helmet>
      <title>{title + " | " + defaultTitle}</title>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="Digikos, Kamar Kost, Kostan" />

      {/* <!-- Facebook Meta Tags --> */}
      <meta
        property="og:url"
        content="https://z9b3z575-5173.asse.devtunnels.ms/"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title + " | " + defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:domain"
        content="z9b3z575-5173.asse.devtunnels.ms"
      />
      <meta
        property="twitter:url"
        content="https://z9b3z575-5173.asse.devtunnels.ms/"
      />
      <meta name="twitter:title" content={title + " | " + defaultTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />

      {/* Meta Tags Generated via https://opengraph.dev  */}
    </Helmet>
  );
};

export default HeadMetaData;
