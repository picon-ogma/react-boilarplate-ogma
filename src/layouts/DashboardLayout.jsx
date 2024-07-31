import PropTypes from "prop-types";

export const DashboardLayout = ({ children }) => {
  return (
    <>
      <header>Header</header>
      <div>Sidebar</div>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
