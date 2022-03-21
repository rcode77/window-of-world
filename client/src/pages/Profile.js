import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMarsAndVenus } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import book4 from "./../assets/Book4.png";
import profile from "./../assets/Profile.png";
import Navbar from "../components/navbar/Navbar";

const styles = {
  bookName: {
    marginTop: "10px",
    fontFamily: "Times New Roman",
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center",
    textDecoration: "none",
    color: "black",
  },
  bookAuthor: {
    fontSize: "18px",
    fontWeight: "400",
    color: "#929292",
    textAlign: "center",
    marginBottom: "50px",
  },
  proTitle: {
    margin: "50px 0px 30px 20px",
    fontFamily: "Times New Roman",
    fontSize: "36px",
    fontWeight: "700",
  },
  proName: {
    fontSize: "12px",
    fontWeight: "400",
    color: "#8A8C90",
  },
  proDetail: {
    fontSize: "14px",
    fontWeight: "700",
  },
  btnSend: {
    marginTop: "20px",
    width: "82%",
    backgroundColor: "#D60000",
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
  },
};

function Profile() {
  const title = "Profile";

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col style={{ widht: "20%", marginLeft: "50px" }}>
            <Navbar title={title} />
          </Col>

          <Col sm={9} style={{ marginRight: "50px" }}>
            <p style={styles.proTitle}>Profile</p>
            <Col style={{ backgroundColor: "#FFD9D9", marginLeft: "20px" }}>
              <Row>
                <Col>
                  <Row>
                    <Col sm={2}>
                      <FontAwesomeIcon
                        style={{
                          fontSize: "30px",
                          margin: "50px 10px 30px 30px",
                          color: "#8A8C90",
                        }}
                        icon={faEnvelope}
                      ></FontAwesomeIcon>
                    </Col>
                    <Col sm={10} style={{ marginTop: "45px" }}>
                      <Col style={styles.proDetail}>egigans@gmail.com</Col>
                      <Col style={styles.proName}>Email</Col>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={2}>
                      <FontAwesomeIcon
                        style={{
                          fontSize: "30px",
                          margin: "10px 10px 30px 30px",
                          color: "#8A8C90",
                        }}
                        icon={faMarsAndVenus}
                      ></FontAwesomeIcon>
                    </Col>
                    <Col sm={10} style={{ marginTop: "5px" }}>
                      <Col style={styles.proDetail}>Male</Col>
                      <Col style={styles.proName}>Gender</Col>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={2}>
                      <FontAwesomeIcon
                        style={{
                          fontSize: "30px",
                          margin: "10px 10px 30px 30px",
                          color: "#8A8C90",
                        }}
                        icon={faPhone}
                      ></FontAwesomeIcon>
                    </Col>
                    <Col sm={10} style={{ marginTop: "5px" }}>
                      <Col style={styles.proDetail}>0812-8623-8911</Col>
                      <Col style={styles.proName}>Mobile phone</Col>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={2}>
                      <FontAwesomeIcon
                        style={{
                          fontSize: "30px",
                          margin: "10px 10px 50px 30px",
                          color: "#8A8C90",
                        }}
                        icon={faLocationDot}
                      ></FontAwesomeIcon>
                    </Col>
                    <Col sm={10} style={{ marginTop: "5px" }}>
                      <Col style={styles.proDetail}>
                        Perumahan Permata Bintaro Residence C-3
                      </Col>
                      <Col style={styles.proName}>Address</Col>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Row style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Col sm={10} style={{ marginTop: "30px" }}>
                      <img src={profile} alt="" />
                      <Button style={styles.btnSend}>Edit Profile</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <p style={styles.proTitle}>My List Book</p>
            <Row>
              <Col sm={3}>
                <center>
                  <Link to="/detailbooka">
                    <img src={book4} alt="book4" />
                  </Link>
                  <Link to="/detailbooka" style={styles.bookName}>
                    Tess on the Road
                  </Link>
                </center>
                <p style={styles.bookAuthor}>Rachel Hartman</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
