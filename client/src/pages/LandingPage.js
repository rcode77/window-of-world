import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, React } from "react";

import SignUpModal from "../components/auth/SignUpModal";
import SignInModal from "../components/auth/SignInModal";

import logo from "./../assets/wow.png";
import backgroundImage from "./../assets/Vector1.png";

const styles = {
  lpBackground: {
    background: "#E5E5E5",
    height: "1000px",
  },
  bgImage: {
    backgroundColor: "#E5E5E5",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
  },
  lpFont: {
    fontSize: "24px",
    fontWeignt: "400",
  },
  btnSignUp: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#D60000",
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
  },
  btnSignIn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#CDCDCDB2",
    color: "black",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
  },
};

function LandingPage() {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const modalSignIn = async (e) => {
    await setSignInModal(true);
    setSignUpModal(false);
  };

  const modalSignUp = async (e) => {
    await setSignUpModal(true);
    setSignInModal(false);
  };

  return (
    <div style={styles.bgImage}>
      <Container>
        <Row>
          <Col>
            <img src={logo} alt="logo" style={{ width: "450px" }} />
            <p style={styles.lpFont}>
              Sign-up now and subscribe to enjoy all the cool and latest books -
              The best book rental service provider in Indonesia
            </p>
            <Row style={{ marginTop: "50px" }}>
              <Col sm={4}>
                <Button style={styles.btnSignUp} onClick={modalSignUp}>
                  Sign Up
                </Button>
              </Col>
              <Col sm={4}>
                <Button style={styles.btnSignIn} onClick={modalSignIn}>
                  Sign In
                </Button>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <SignUpModal
        trigger={modalSignIn}
        show={signUpModal}
        onHide={() => setSignUpModal(false)}
      />
      <SignInModal
        trigger={modalSignUp}
        show={signInModal}
        onHide={() => setSignInModal(false)}
      />
    </div>
  );
}

export default LandingPage;
