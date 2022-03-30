import React from "react";
import { Card } from "react-bootstrap";

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

export default function ListMyBook({ item }) {
  return (
    <center>
      <Card style={{ backgroundColor: "#E5E5E5", border: "none" }}>
        <a
          style={{
            cursor: "pointer",
          }}
        >
          <Card.Img
            variant="top"
            src={"http://localhost:5000/uploads/images/" + item.myBook.cover}
            alt={item.myBook.cover}
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
          >
            <Card.Title style={styles.bookName}>{item.myBook.title}</Card.Title>
          </a>
          <Card.Text style={styles.bookAuthor}>{item.myBook.author}</Card.Text>
        </Card.Body>
      </Card>
    </center>
  );
}
