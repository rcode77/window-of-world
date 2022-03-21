import React from "react";
import { Modal } from "react-bootstrap";

const styles = {
  link: {
    marginTop: "10px",
    textDecoration: "none",
    color: "#D60000",
    fontWeight: "400",
    fontSize: "24px",
  },
};

function DangerPopUp(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <center>
        <Modal.Body style={{ width: "90%" }}>
          <p style={styles.link}>
            Please make a payment to read the latest books
          </p>
        </Modal.Body>
      </center>
    </Modal>
  );
}

export default DangerPopUp;
