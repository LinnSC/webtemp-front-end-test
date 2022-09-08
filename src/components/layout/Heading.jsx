import PropTypes from "prop-types";

function Heading({ size = "1", children }) {
  const Heading = `h${size}`;

  return <Heading>{children}</Heading>;
}

Heading.propTypes = {
  size: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Heading;
