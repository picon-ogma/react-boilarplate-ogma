import PropTypes from "prop-types";
import { DocumentHead } from "../common/components/seo/DocumentHead";

export const UnauthenticatedLayout = ({ children, title }) => {
  return (
    <>
      <DocumentHead title={title} />
      {children}
    </>
  );
};

UnauthenticatedLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
