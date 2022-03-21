import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { ReactReader } from "react-reader";

import ebook from "../epub/melville-moby-dick.epub";
import logo from "../assets/wow2.png";

const styles = {
  proTitle: {
    marginBottom: "30px",
    fontFamily: "Times New Roman",
    fontSize: "24px",
    fontWeight: "700",
  },
};

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
                  url={ebook}
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
