import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";

const styles = {
  link: {
    marginTop: "10px",
    textDecoration: "none",
    color: "#D60000",
    fontWeight: "400",
    fontSize: "24px",
  },
  btnSignUp: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#D60000",
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
  },
  btnSignIn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#CDCDCDB2",
    color: "black",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
  },
};

export default function DeletePopUp({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <center>
        <Modal.Body style={{ width: "90%" }}>
          <p style={styles.link}>Are you sure you want to delete this book?</p>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 50,
            }}
          >
            <Col md={3}>
              <Button style={styles.btnSignUp} onClick={handleDelete}>
                Yes
              </Button>
            </Col>
            <Col md={3}>
              <Button style={styles.btnSignIn} onClick={handleClose}>
                No
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </center>
    </Modal>
  );
}
