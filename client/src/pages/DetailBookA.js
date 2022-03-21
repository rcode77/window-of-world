import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

import logo from "./../assets/wow2.png";
import cProfile from "./../assets/CProfile.png";
import user from "./../assets/user.png";
import bill from "./../assets/bill.png";
import logout from "./../assets/logout.png";
import detailBook from "./../assets/DetailBook.png";

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
    color: "green",
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
  },
  navIcon: {
    fontSize: "25px",
    color: "#929292",
  },
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
  btnRead: {
    width: "100%",
    backgroundColor: "#CDCDCDB2",
    color: "black",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
  },
};

function DetailBookA() {
  const navi = useNavigate();

  const handleRead = () => {
    navi("/read");
  };
  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col style={{ widht: "20%", marginLeft: "50px" }}>
            <center>
              <Link to="/homes">
                <img src={logo} alt="logo" style={{ marginTop: "20px" }} />
              </Link>
              <br />
              <img
                src={cProfile}
                alt="cprofile"
                style={{ marginTop: "20px" }}
              />
              <p style={styles.pName}>Egi Ganteng</p>
              <p style={styles.pStat}>Subscribed</p>
              <hr />
              <ul style={{ listStyleType: "none", textAlign: "start" }}>
                <Row style={{ marginTop: "40px" }}>
                  <li style={styles.navList}>
                    <img src={user} alt="user" />
                    <Link to="/profile" style={styles.navName}>
                      Profile
                    </Link>
                  </li>
                </Row>
                <Row style={{ marginTop: "60px", marginBottom: "80px" }}>
                  <li style={styles.navList}>
                    <img src={bill} alt="bill" />
                    <Link to="/subscribe" style={styles.navName}>
                      Subscribe
                    </Link>
                  </li>
                </Row>
              </ul>
              <hr />
              <ul style={{ listStyleType: "none", textAlign: "start" }}>
                <Row style={{ marginTop: "40px" }}>
                  <li style={styles.navList}>
                    <img src={logout} alt="logout" />
                    <Link to="/" style={styles.navName}>
                      Logout
                    </Link>
                  </li>
                </Row>
              </ul>
            </center>
          </Col>

          <Col sm={9} style={{ marginRight: "50px" }}>
            <Row style={{ marginTop: "100px" }}>
              <Col sm={5} style={{ marginLeft: "50px" }}>
                <img src={detailBook} alt="detailbook" />
              </Col>
              <Col sm={6} style={{ marginLeft: "20px" }}>
                <p style={styles.bookName}>Tess on the Road</p>
                <p style={styles.bookAuthor}>Rachel Hartman</p>
                <Col>
                  <p style={styles.detailName}>Publication date</p>
                  <p style={styles.detailInfo}>April 2020</p>
                </Col>
                <Col>
                  <p style={styles.detailName}>Pages</p>
                  <p style={styles.detailInfo}>436</p>
                </Col>
                <Col>
                  <p style={styles.detailName}>ISBN</p>
                  <p style={styles.detailInfo}>9781789807554</p>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col style={{ marginLeft: "50px" }}>
                <p style={styles.about}>About This Book</p>
                <p style={styles.detailInfo}>
                  In the medieval kingdom of Goredd, women are expected to be
                  ladies, men are their protectors, and dragons get to be
                  whomever they want. Tess, stubbornly, is a troublemaker. You
                  can’t make a scene at your sister’s wedding and break a
                  relative’s nose with one punch (no matter how pompous he is)
                  and not suffer the consequences. As her family plans to send
                  her to a nunnery, Tess yanks on her boots and sets out on a
                  journey across the Southlands, alone and pretending to be a
                  boy.
                </p>
                <p style={styles.detailInfo}>
                  Where Tess is headed is a mystery, even to her. So when she
                  runs into an old friend, it’s a stroke of luck. This friend is
                  a quigutl—a subspecies of dragon—who gives her both a purpose
                  and protection on the road. But Tess is guarding a troubling
                  secret. Her tumultuous past is a heavy burden to carry, and
                  the memories she’s tried to forget threaten to expose her to
                  the world in more ways than one.
                </p>
                <p style={styles.detailInfo}>
                  Returning to the fascinating world she created in the
                  award-winning and New York Times bestselling Seraphina, Rachel
                  Hartman introduces readers to a new character and a new quest,
                  pushing the boundaries of genre once again in this wholly
                  original fantasy.
                </p>
              </Col>
            </Row>
            <Row style={styles.btn}>
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

export default DetailBookA;
