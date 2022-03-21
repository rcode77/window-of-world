import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AdminNavbar from "../components/navbar/AdminNavbar";

import { API } from "../config/api";

const styles = {
  proTitle: {
    marginTop: "20px",
    marginBottom: "30px",
    fontFamily: "Times New Roman",
    fontSize: "24px",
    fontWeight: "700",
  },
};

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();
  const [transaction, setTransaction] = useState({ paymentStatus: "" });

  // Get product data from database
  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      // Store product data to useState variabel
      setTransactions(response.data.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetching category data by id from database
  const getTransaction = async (id) => {
    try {
      const response = await API.get("/transaction/" + id);
      // Store product data to useState variabel
      setTransaction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("berhasil");
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      // const body = JSON.stringify(transaction{paymentStatus: "Approved"});

      // Insert category data
      const response = await API.patch(
        "/transaction/" + id,
        { paymentStatus: "Approved" },
        config
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    getTransaction(id);
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col>
            <AdminNavbar />
          </Col>

          <center>
            <Col sm={9} style={{ marginRight: "20px", marginBottom: "300px" }}>
              <p style={styles.proTitle}>Incoming Transaction</p>
              {transactions.length !== 0 ? (
                <Col>
                  <Col>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Users</th>
                          <th>Bukti Transfer</th>
                          <th>Remaining Active</th>
                          <th>Status User</th>
                          <th>Status Payment</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions?.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.user.fullName}</td>
                            <td>{item.transferProof}</td>
                            <td>{item.remainingActive} / Hari</td>
                            <td style={{ color: "#0ACF83" }}>
                              {item.userStatus}
                            </td>
                            <td>{item.paymentStatus}</td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="none"
                                  id="dropdown-basic"
                                ></Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <center>
                                    <Dropdown.Item
                                      onClick={handleSubmit}
                                      style={{ color: "#0ACF83" }}
                                    >
                                      Aproved
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href="#/action-2"
                                      style={{ color: "#FF0742" }}
                                    >
                                      Cancel
                                    </Dropdown.Item>
                                  </center>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
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
          </center>
        </Row>
      </Container>
    </div>
  );
}

export default Transaction;
