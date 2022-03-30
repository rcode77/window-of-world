import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

import { API } from "../config/api";

import addBooks from "./../assets/addbook2.png";
import AdminNavbar from "../components/navbar/AdminNavbar";

const styles = {
  proTitle: {
    marginBottom: "30px",
    fontFamily: "Times New Roman",
    fontSize: "24px",
    fontWeight: "700",
  },
  form: {
    backgroundColor: "#BCBCBC40",
    border: "2px solid #BCBCBC",
  },
  textArea: {
    backgroundColor: "#BCBCBC40",
    border: "2px solid #BCBCBC",
    resize: "none",
  },
  inputText: {
    color: "#333333",
    fontSize: "18px",
    fontWeight: "600",
  },
  fileInput: {
    backgroundColor: "#BCBCBC40",
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
  btnAdd: {
    width: "100%",
    backgroundColor: "#D60000",
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
  },
};

function AddBook() {
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    cover: "",
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    bookFile: "",
  });

  const { title, publicationDate, pages, author, isbn, about } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file" && e.target.name === "cover") {
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
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("author", form.author);
      formData.set("isbn", form.isbn);
      formData.set("about", form.about);
      formData.set("cover", form.cover[0], form.cover[0].name);
      formData.set("bookFile", form.bookFile[0], form.bookFile[0].name);

      const response = await API.post("/book", formData, config);

      setForm({
        title: "",
        publicationDate: "",
        pages: "",
        author: "",
        isbn: "",
        about: "",
        bookFile: "",
        cover: "",
      });

      setPreview(null);

      if (response.data.status === "success") {
        const alert = (
          <Alert
            variant="success"
            className="py-1 d-flex justify-content-center"
          >
            Add Book Success
          </Alert>
        );
        setMessage(alert);

        new FormData();
      } else {
        const alert = (
          <Alert
            variant="danger"
            className="py-1 d-flex justify-content-center"
          >
            Add Book Failed
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
          <Col>
            <AdminNavbar />
          </Col>

          <center>
            <Col sm={9} style={{ marginRight: "20px", marginBottom: "100px" }}>
              <p style={styles.proTitle}>Add Book</p>
              <Form onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    style={styles.form}
                    value={title}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="date"
                    placeholder="Publication Date"
                    name="publicationDate"
                    onChange={handleChange}
                    style={styles.form}
                    value={publicationDate}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Pages"
                    name="pages"
                    onChange={handleChange}
                    style={styles.form}
                    value={pages}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Author"
                    name="author"
                    onChange={handleChange}
                    style={styles.form}
                    value={author}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="ISBN"
                    name="isbn"
                    onChange={handleChange}
                    style={styles.form}
                    value={isbn}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={6}
                    style={styles.textArea}
                    placeholder="About This Book"
                    name="about"
                    onChange={handleChange}
                    value={about}
                  />
                </Form.Group>

                <Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Col sm={3}>
                    <Form.Group className="form-group mb-5">
                      <Form.Control
                        id="input-file"
                        className="input-file"
                        type="file"
                        hidden
                        name="bookFile"
                        onChange={handleChange}
                      />
                      <Form.Label htmlFor="input-file" style={styles.fileInput}>
                        <span className="me-2">Attach Book File</span>
                        <img
                          src="assets/file2.png"
                          alt="attach"
                          style={{ width: "15px" }}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group className="form-group">
                      <Form.Control
                        id="input-cover"
                        className="input-file"
                        type="file"
                        name="cover"
                        hidden
                        onChange={handleChange}
                      />
                      <Form.Label
                        htmlFor="input-cover"
                        style={styles.fileInput}
                      >
                        <span className="me-2">Attach Book Cover</span>
                        <img
                          src="assets/file2.png"
                          alt="attach"
                          style={{ width: "15px" }}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>
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

                <Row style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Col sm={2}>
                    <Button style={styles.btnAdd} type="submit">
                      Add Book{" "}
                      <img
                        style={{ marginLeft: "5px" }}
                        src={addBooks}
                        alt="addbook"
                      />
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </center>
        </Row>
      </Container>
    </div>
  );
}

export default AddBook;
