import React, { useState, useContext } from "react";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import { API } from "../../config/api";

import SignInModal from "../auth/SignInModal";

const styles = {
  title: {
    marginTop: "20px",
    fontSize: "36px",
    fontWeight: "700",
  },
  btnSignUp: {
    marginTop: "50px",
    width: "100%",
    height: "50px",
    backgroundColor: "#D60000",
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
  },
  input: {
    height: "50px",
    marginTop: "30px",
    backgroundColor: "#BCBCBC40",
    border: "2px solid #BCBCBC",
  },
  text: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  },
  link: {
    marginLeft: "5px",
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

function SignUpModal(props) {
  const [signInModal, setSignInModal] = useState(false);
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  // Store data with useState here ...
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { email, password, fullName } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create Configuration Content-type here ...
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Convert form data to string here ...
      const body = JSON.stringify(form);

      // Insert data user to database here ...
      const response = await API.post("/register", body, config);
      console.log(response);

      // Notification
      if (response.data.status == "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={styles.title}>Sign Up</Form.Label>
            {message && message}
            <Form.Control
              style={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <Form.Control
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <Form.Control
              style={styles.input}
              type="text"
              name="fullName"
              placeholder="Fullname"
              value={fullName}
              onChange={handleChange}
            />
            <Button style={styles.btnSignUp} type="submit">
              Sign Up
            </Button>
            <Col style={styles.text}>
              <p>Already have an account ? Klik</p>
              <a onClick={props.trigger} style={styles.link}>
                Here
              </a>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <SignInModal show={signInModal} onHide={() => setSignInModal(false)} />
    </Modal>
  );
}

export default SignUpModal;
