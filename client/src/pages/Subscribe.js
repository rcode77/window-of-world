import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

import SuccessPopUp from "../components/popup/SuccessPopUp";

import wow from "./../assets/wow3.png";
import input from "./../assets/file.png";
import Navbar from "../components/navbar/Navbar";

import { API } from "../config/api";

const styles = {
  title: {
    fontFamily: "Times New Roman",
    fontSize: "36px",
    fontWeight: "700",
  },
  text: {
    marginRight: "5px",
    fontSize: "18px",
    fontWeight: "400",
  },
  number: {
    marginLeft: "5px",
    fontSize: "18px",
    fontWeight: "700",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    marginTop: "150px",
    marginBottom: "50px",
    display: "flex",
    justifyContent: "center",
  },
  inputText: {
    color: "#D60000",
    fontSize: "18px",
    fontWeight: "700",
  },
  fileInput: {
    backgroundColor: "#E5E5E5",
    border: "2px solid #BCBCBC",
    borderRadius: "5px",
    padding: "8px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    color: "#D60000",
    fontSize: "18px",
    fontWeight: "700",
  },
  btnSend: {
    marginTop: "30px",
    width: "100%",
    backgroundColor: "#D60000",
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
  },
};

function Subscribe() {
  const title = "Subscribe";

  const [successModal, setSuccessModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    userId: "",
    transferProof: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (
      e.target.type === "file" &&
      e.target.files[0].type !== "application/epub+zip"
    ) {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("userId", form.userId);
      formData.set(
        "transferProof",
        form.transferProof[0],
        form.transferProof[0].name
      );

      const response = await API.post("/transaction", formData, config);

      if (response.data.status === "success") {
        const alert = (
          <Alert
            variant="success"
            className="py-1 d-flex justify-content-center"
          >
            Success
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert
            variant="danger"
            className="py-1 d-flex justify-content-center"
          >
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col style={{ widht: "20%", marginLeft: "50px" }}>
            <Navbar title={title} />
          </Col>

          <Col sm={9} style={{ marginRight: "50px" }}>
            <Row style={styles.form}>
              <Col sm={6}>
                <center>
                  <Form onSubmit={handleOnSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <p style={styles.title}>Premium</p>
                      <Col style={styles.center}>
                        <p style={styles.text}>
                          Pay now and access all the latest books from{" "}
                        </p>
                        <img style={{ height: "29px" }} src={wow} alt="wow" />
                      </Col>
                      <Col style={styles.center}>
                        <img style={{ height: "29px" }} src={wow} alt="wow" />
                        <p style={styles.number}>: 0981312323</p>
                      </Col>
                      <Col sm={9}>
                        <Form.Control
                          style={{
                            backgroundColor: "#BCBCBC40",
                            border: "2px solid #BCBCBC",
                          }}
                          type="text"
                          placeholder="Input your account number"
                          name="userId"
                          onChange={handleChange}
                        />
                        <Col>
                          <Form.Group className="form-group mb-3 mt-3">
                            <Form.Control
                              id="input-file"
                              className="input-file"
                              type="file"
                              hidden
                              name="transferProof"
                              onChange={handleChange}
                            />
                            <Form.Label
                              htmlFor="input-file"
                              style={styles.fileInput}
                            >
                              <span className="me-2">
                                Attache proof of transfer
                              </span>
                              <img src={input} alt="attach" />
                            </Form.Label>
                          </Form.Group>
                        </Col>
                        {preview && (
                          <div className="d-flex justify-content-center">
                            <img
                              src={preview}
                              style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                objectFit: "cover",
                                margin: "10px 0px",
                              }}
                              alt="preview"
                            />
                          </div>
                        )}
                        {message && message}
                        <Button
                          style={styles.btnSend}
                          onClick={() => setSuccessModal(true)}
                          type="submit"
                        >
                          Send
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </center>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <SuccessPopUp show={successModal} onHide={() => setSuccessModal(false)} />
    </div>
  );
}

export default Subscribe;
