import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const styles = {
  link: {
    textDecoration: "none",
    color: "#29BD11",
    fontWeight: "400",
    fontSize: "24px",
    cursor: "pointer",
  },
};

function SuccessPopUp(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <center>
        <Modal.Body style={{ width: "80%" }}>
          <Link to="/homes" style={styles.link}>
            Thank you for subscribing to premium, your premium package will be
            active after our admin approves your transaction, thank you
          </Link>
        </Modal.Body>
      </center>
    </Modal>
  );
}

export default SuccessPopUp;
