import React, { useContext, useState } from "react";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

import input from "../assets/file2.png";

// import { UserContext } from "../context/UserContext";

import { API } from "../config/api";

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
  fileInput: {
    backgroundColor: "#E5E5E5",
    border: "2px solid #BCBCBC",
    borderRadius: "5px",
    padding: "8px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    color: "#333333",
    fontSize: "18px",
    fontWeight: "600",
  },
};

function EditProfile(props) {
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    gender: "",
    phone: "",
    address: "",
    userImage: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      // e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("gender", form.gender);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      formData.set("userImage", form.userImage[0], form.userImage[0].name);

      const response = await API.patch("/edit-profile", formData, config);

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
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={styles.title}>Edit Profile</Form.Label>
            {message && message}
            <Form.Select
              className="mb-3"
              style={styles.input}
              name="gender"
              onChange={handleChange}
              value={form.gender}
            >
              <option>Choose Your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
            <Form.Control
              style={styles.input}
              type="number"
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <Form.Control
              style={styles.input}
              type="text"
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <Form.Group className="form-group mb-3 mt-4">
              <Form.Control
                id="input-file"
                className="input-file"
                type="file"
                hidden
                name="userImage"
                onChange={handleChange}
              />
              <Form.Label htmlFor="input-file" style={styles.fileInput}>
                <span className="me-2">Choose Your Profile Image</span>
                <img src={input} alt="attach" />
              </Form.Label>
            </Form.Group>
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
            <Button style={styles.btnSignUp} type="submit">
              Confirm Edit
            </Button>
            {/* <Col style={styles.text}>
              <p>Don't have an account ? Klik</p>
              <a onClick={props.trigger} style={styles.link}>
                Here
              </a>
            </Col> */}
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProfile;
