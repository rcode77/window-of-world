import { Col, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../context/UserContext";

import logo from "../../assets/wow2.png";
import aProfile from "../../assets/aProfile.png";
import book from "../../assets/addbook.png";
import logoutIcon from "../../assets/logout.png";

const styles = {
  dropName: {
    marginTop: "15px",
    marginLeft: "10px",
    fontSize: "18px",
    fontWeight: "500",
  },
};

export default function AdminNavbar() {
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
    <Col style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to="/transaction">
        <img
          src={logo}
          alt="logo"
          style={{ marginTop: "40px", marginLeft: "50px" }}
        />
      </Link>
      <Dropdown style={{ marginTop: "40px", marginRight: "30px" }}>
        <Dropdown.Toggle variant="none" id="dropdown-basic">
          <img src={aProfile} alt="aprofile" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/addbook">
            <Col style={{ display: "flex", alignItems: "center" }}>
              <img src={book} style={{ height: "25px" }} alt="add" />
              <p style={styles.dropName}>Add Book</p>
            </Col>
          </Dropdown.Item>
          <Dropdown.Item onClick={logout}>
            <Col style={{ display: "flex", alignItems: "center" }}>
              <img src={logoutIcon} style={{ height: "25px" }} alt="logout" />
              <p style={styles.dropName}>Logout</p>
            </Col>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}
