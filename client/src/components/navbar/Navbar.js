import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../context/UserContext";

import logo from "../../assets/wow2.png";
import cProfile from "../../assets/userImage.png";
import user from "../../assets/user.png";
import userActive from "../../assets/user2.png";
import bill from "../../assets/bill.png";
import billActive from "../../assets/bill2.png";
import logoutIcon from "../../assets/logout.png";

const styles = {
  pName: {
    marginTop: "20px",
    fontSize: "24px",
    fontWeight: "700",
  },
  sub: {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "700",
    color: "green",
  },
  notSub: {
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
  navActive: {
    marginLeft: "20px",
    textDecoration: "none",
    color: "#D60000",
    fontSize: "25px",
    fontWeight: "400",
  },
};

export default function Navbar(props) {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <Col>
      <center>
        <Link to="/home">
          <img src={logo} alt="logo" style={{ marginTop: "20px" }} />
        </Link>
        <br />
        <img
          src={
            state.user.userImage === "-"
              ? cProfile
              : "http://localhost:5000/uploads/images/" + state.user.userImage
          }
          alt="cprofile"
          style={{
            marginTop: "20px",
            width: "100px",
            height: "100px",
            objectFit: "cover",
            objectPosition: "middle",
          }}
          className="rounded-circle border-black"
        />
        <p style={styles.pName}>{state.user.fullName}</p>
        <div>
          {state.user.subscribe === "Subscribed" ? (
            <p style={styles.sub}>Subscribed</p>
          ) : (
            <p style={styles.notSub}>Not Subscribed Yet</p>
          )}
        </div>

        <hr />
        <ul style={{ listStyleType: "none", textAlign: "start" }}>
          <Row style={{ marginTop: "40px" }}>
            <li style={styles.navList}>
              <img
                src={props?.title === "Profile" ? userActive : user}
                alt="user"
              />
              <Link
                to="/profile"
                style={
                  props?.title === "Profile" ? styles.navActive : styles.navName
                }
              >
                Profile
              </Link>
            </li>
          </Row>
          <Row style={{ marginTop: "60px", marginBottom: "80px" }}>
            <li style={styles.navList}>
              <img
                src={props?.title === "Subscribe" ? billActive : bill}
                alt="bill"
              />
              <Link
                to="/subscribe"
                style={
                  props?.title === "Subscribe"
                    ? styles.navActive
                    : styles.navName
                }
              >
                Subscribe
              </Link>
            </li>
          </Row>
        </ul>
        <hr />
        <ul style={{ listStyleType: "none", textAlign: "start" }}>
          <Row style={{ marginTop: "40px" }}>
            <li style={styles.navList}>
              <img src={logoutIcon} alt="logout" />
              <a onClick={logout} style={styles.navName}>
                Logout
              </a>
            </li>
          </Row>
        </ul>
      </center>
    </Col>
  );
}
