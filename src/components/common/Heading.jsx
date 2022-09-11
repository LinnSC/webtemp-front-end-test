import PropTypes from "prop-types";

export default function Heading({ size = "1", children, className }) {
  const Heading = `h${size}`;

  return <Heading className={className}>{children}</Heading>;
}

Heading.propTypes = {
  size: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.node,
};
