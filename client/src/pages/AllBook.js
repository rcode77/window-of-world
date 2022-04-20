import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { API } from "../config/api";

import addBooks from "./../assets/addbook2.png";
import ListBook from "../components/ListBook";
import AdminNavbar from "../components/navbar/AdminNavbar";
import DeletePopUp from "../components/popup/DeletePopUp";

const styles = {
  proTitle: {
    marginBottom: "30px",
    fontFamily: "Times New Roman",
    fontSize: "36px",
    fontWeight: "700",
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

export default function AllBook() {
  const [books, setBooks] = useState([]);
  //   const [state] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Create function get books data from database here ...
  const getBooks = async () => {
    try {
      const response = await API.get("/books");
      setBooks(response.data.books);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Call function get books with useEffect didMount here ...
  useEffect(() => {
    getBooks();
  }, []);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/book/${id}`);
      getBooks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col>
            <AdminNavbar />
          </Col>

          <center>
            <Col sm={9} style={{ marginRight: "20px", marginBottom: "100px" }}>
              <p style={styles.proTitle}>All Book</p>
              {books.length !== 0 ? (
                <Col className="d-flex flex-wrap">
                  {books?.map((item) => (
                    <Col md={3} key={item.id}>
                      <ListBook item={item} />
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: 50,
                        }}
                      >
                        <Col md={5}>
                          <Link to={"/editbook/" + item.id}>
                            <Button style={styles.btnSignUp}>Edit</Button>
                          </Link>
                        </Col>
                        <Col md={5}>
                          <Button
                            style={styles.btnSignIn}
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Col>
              ) : (
                <Col>
                  <div className="text-center pt-5">
                    <img
                      src="assets/nodata.png"
                      className="img-fluid"
                      style={{ width: "40%" }}
                      alt="empty"
                    />
                  </div>
                </Col>
              )}
            </Col>
          </center>
        </Row>
        <DeletePopUp
          show={show}
          handleClose={handleClose}
          setConfirmDelete={setConfirmDelete}
        />
      </Container>
    </div>
  );
}
