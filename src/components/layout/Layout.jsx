import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex justify-content-center mx-2 md:mx-5 ">
        <div className="w-11">{children}</div>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
