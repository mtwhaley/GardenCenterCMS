import * as utils from "../Utilities.js";
import { ConnectionError } from "./ConnectionError.js";
import { StatusError } from "./StatusError.js";
import "./errors.css";
import PropTypes from "prop-types";

export function Error({ status, onClose }) {
  let message = "";
  if (utils.statusCodeMessages[status.statusCode] !== undefined) {
    message = `Error: ${utils.statusCodeMessages[status.statusCode]}`;
  } else {
    console.log(`status code not found: ${status.statusCode}`);
    message = `Oops! Something went wrong!`;
  }

  return (
    <>
      {!status.connection ? (
        <ConnectionError />
      ) : (
        status.hide === undefined && (
          <StatusError message={message} onClose={onClose} />
        )
      )}
    </>
  );
}

Error.propTypes = {
  status: PropTypes.object,
  onClose: PropTypes.func,
};
