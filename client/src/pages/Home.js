import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import banner from "./../assets/Frame1.png";

import Navbar from "../components/navbar/Navbar";
import DangerPopUp from "../components/popup/DangerPopUp";
import ListBook from "../components/ListBook";

import { API } from "../config/api";

const styles = {
  pName: {
    marginTop: "20px",
    fontSize: "24px",
    fontWeight: "700",
  },
  pStat: {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "700",
    color: "red",
  },
  navList: {
    display: "flex",
    alignItems: "center",
  },
  navName: {
    marginLeft: "20px",
    textDecoration: "none",
    color: "#929292",
    fontSize: "25px",
    fontWeight: "400",
    cursor: "pointer",
  },
  navIcon: {
    fontSize: "25px",
    color: "#929292",
  },
  listBook: {
    marginLeft: "20px",
    fontFamily: "Times New Roman",
    fontSize: "36px",
    fontWeight: "700",
  },
};

function Home() {
  const [dangerModal, setDangerModal] = useState(false);

  const [books, setBooks] = useState([]);

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

  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    700: 3,
    500: 2,
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col style={{ widht: "20%", marginLeft: "50px" }}>
            <Navbar />
          </Col>

          <Col sm={9} style={{ marginRight: "50px" }}>
            <img
              src={banner}
              style={{ marginTop: "30px", width: "100%" }}
              alt="banner"
            />
            <p style={styles.listBook}>List Book</p>
            <Row>
              <Col>
                {books.length !== 0 ? (
                  <Col className="d-flex flex-wrap">
                    {books?.map((item, index) => (
                      <Col md={3}>
                        <ListBook item={item} key={index} />
                      </Col>
                    ))}
                  </Col>
                ) : (
                  <Col>
                    <div className="text-center pt-5">
                      <img
                        src="assets/file.png"
                        className="img-fluid"
                        style={{ width: "40%" }}
                        alt="empty"
                      />
                      <div className="mt-3">No data product</div>
                    </div>
                  </Col>
                )}
              </Col>
              <DangerPopUp
                show={dangerModal}
                onHide={() => setDangerModal(false)}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
