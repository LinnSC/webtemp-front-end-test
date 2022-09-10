import { Message } from "primereact/message";
import PropTypes from "prop-types";

export default function AlertMessage({ severity, text }) {
  return (
    <Message className="mt-8 mb-2" severity={severity} text={text}></Message>
  );
}

AlertMessage.proptTypes = {
  severity: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired,
};
