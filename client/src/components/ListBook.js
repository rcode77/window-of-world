import React from "react";
import { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import DangerPopUp from "./popup/DangerPopUp";

const styles = {
  bookName: {
    marginTop: "10px",
    fontFamily: "Times New Roman",
    fontSize: "24px",
    fontWeight: "700",
  },
  bookAuthor: {
    fontSize: "18px",
    fontWeight: "400",
    color: "#929292",
    marginBottom: "50px",
  },
};

export default function ListBook({ item }) {
  const [dangerModal, setDangerModal] = useState(false);
  return (
    <Link to={`/book/` + item.id} style={{ textDecoration: "none" }}>
      <center>
        <Card style={{ backgroundColor: "#E5E5E5", border: "none" }}>
          <a
            style={{
              cursor: "pointer",
            }}
            onClick={() => setDangerModal(true)}
          >
            <Card.Img
              variant="top"
              src={item.bookCover}
              style={{ width: "90%" }}
            />
          </a>
          <Card.Body>
            <a
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
              onClick={() => setDangerModal(true)}
            >
              <Card.Title style={styles.bookName}>{item.title}</Card.Title>
            </a>
            <Card.Text style={styles.bookAuthor}>{item.author}</Card.Text>
          </Card.Body>
        </Card>
      </center>

      <DangerPopUp show={dangerModal} onHide={() => setDangerModal(false)} />
    </Link>
  );
}
