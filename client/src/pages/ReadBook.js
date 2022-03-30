import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { ReactReader } from "react-reader";

// import ebook from "../epub/melville-moby-dick.epub";
import logo from "../assets/wow2.png";

import { API } from "../config/api";

function ReadBook() {
  const [page, setPage] = useState("");
  const renditionRef = useRef(null);
  const tocRef = useRef(null);
  const locationChanged = (epubcifi) => {
    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start;
      const chapter = tocRef.current.find((item) => item.href === href);
      setPage(
        `Page ${displayed.page} of ${displayed.total} in chapter ${
          chapter ? chapter.label : "n/a"
        }`
      );
    }
  };

  const params = useParams();

  const [book, setBook] = useState({});

  // Fetching detail book data by id from database
  const getBook = async () => {
    try {
      const response = await API.get("/book/" + params.id);
      // Store book data to useState variabel
      setBook(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5", height: "100vh" }}>
      <Container fluid>
        <Row>
          <Col>
            <Link to="/home">
              <img
                src={logo}
                alt="logo"
                style={{ marginTop: "20px", marginLeft: "50px" }}
              />
            </Link>
          </Col>

          <center>
            <Col sm={9}>
              <div style={{ height: "500px" }}>
                <ReactReader
                  showToc={false}
                  locationChanged={locationChanged}
                  url={book?.bookFile}
                  getRendition={(rendition) =>
                    (renditionRef.current = rendition)
                  }
                  tocChanged={(toc) => (tocRef.current = toc)}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "120px",
                    right: "1rem",
                    left: "1rem",
                    textAlign: "center",
                    zIndex: 1,
                  }}
                >
                  {page}
                </div>
              </div>
            </Col>
          </center>
        </Row>
      </Container>
    </div>
  );
}

export default ReadBook;
