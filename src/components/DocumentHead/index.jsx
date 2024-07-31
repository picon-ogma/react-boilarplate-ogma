import { Helmet, HelmetData } from "react-helmet-async";
import PropTypes from "prop-types";

const helmetData = new HelmetData({});

export const DocumentHead = ({ title, description }) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | App Name` : undefined}
      defaultTitle="App Name"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};

DocumentHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
