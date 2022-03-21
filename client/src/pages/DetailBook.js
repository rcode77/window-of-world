import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import bookmark from "./../assets/bookmark.png";
import Navbar from "../components/navbar/Navbar";

import { API } from "../config/api";

const styles = {
  bookName: {
    fontFamily: "Times New Roman",
    fontSize: "64px",
    fontWeight: "700",
  },
  bookAuthor: {
    fontSize: "24px",
    fontWeight: "400",
    color: "#929292",
    marginBottom: "50px",
  },
  detailName: {
    fontSize: "24px",
    fontWeight: "700",
  },
  detailInfo: {
    fontSize: "18px",
    fontWeight: "400",
    color: "#929292",
    marginBottom: "30px",
    textAlign: "justify",
  },
  about: {
    marginTop: "50px",
    fontFamily: "Times New Roman",
    fontSize: "36px",
    fontWeight: "700",
  },
  btn: {
    marginTop: "30px",
    marginBottom: "50px",
    display: "flex",
    justifyContent: "flex-end",
  },
  btnAdd: {
    width: "100%",
    backgroundColor: "#D60000",
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
  },
  btnRead: {
    width: "100%",
    backgroundColor: "#CDCDCDB2",
    color: "black",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
  },
  coverImage: {
    marginTop: "30px",
    marginLeft: "50px",
    width: "90%",
  },
};

function DetailBook() {
  const navigate = useNavigate();

  const handleRead = () => {
    navigate("/read-book");
  };
  const handleAdd = () => {
    navigate("/profile");
  };

  let { id } = useParams();

  const [book, setBook] = useState({});

  // Fetching detail book data by id from database
  const getBook = async (id) => {
    try {
      const response = await API.get("/book/" + id);
      // Store book data to useState variabel
      setBook(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook(id);
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col style={{ widht: "20%", marginLeft: "50px" }}>
            <Navbar />
          </Col>

          <Col sm={9} style={{ marginRight: "50px" }}>
            <Row style={{ marginTop: "50px" }}>
              <Col sm={6}>
                <img
                  style={styles.coverImage}
                  src={book.bookCover}
                  alt="detailbook"
                />
              </Col>
              <Col sm={5} style={{ marginLeft: "20px" }}>
                <p style={styles.bookName}>{book.title}</p>
                <p style={styles.bookAuthor}>{book.author}</p>
                <Col>
                  <p style={styles.detailName}>Publication date</p>
                  <p style={styles.detailInfo}>{book.publicationDate}</p>
                </Col>
                <Col>
                  <p style={styles.detailName}>Pages</p>
                  <p style={styles.detailInfo}>{book.pages}</p>
                </Col>
                <Col>
                  <p style={styles.detailName}>ISBN</p>
                  <p style={styles.detailInfo}>{book.isbn}</p>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col style={{ marginLeft: "50px" }}>
                <p style={styles.about}>About This Book</p>
                <p style={styles.detailInfo}>{book.about}</p>
              </Col>
            </Row>
            <Row style={styles.btn}>
              <Col sm={2}>
                <Button style={styles.btnAdd} onClick={handleAdd}>
                  Add My List{" "}
                  <img
                    style={{ marginLeft: "5px" }}
                    src={bookmark}
                    alt="bookmark"
                  />
                </Button>
              </Col>
              <Col sm={2}>
                <Button style={styles.btnRead} onClick={handleRead}>
                  Read Book{" "}
                  <FontAwesomeIcon
                    style={{ marginLeft: "5px" }}
                    icon={faAngleRight}
                  ></FontAwesomeIcon>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailBook;
