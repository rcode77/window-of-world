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
  success: {
    color: "#0ACF83",
    fontWeight: "700",
  },
  danger: {
    color: "#FF0742",
    fontWeight: "700",
  },
  pending: {
    color: "#F7941E",
    fontWeight: "700",
  },
};

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();

  // Get product data from database
  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      // Store product data to useState variabel
      setTransactions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approve = async (id) => {
    const response = await API.patch("/transaction/" + id);

    getTransactions();
  };

  const cancel = async (id) => {
    const response = await API.patch("/cancel/" + id);

    getTransactions();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col>
            <AdminNavbar />
          </Col>

          <center>
            <Col sm={9} style={{ marginRight: "20px", marginBottom: "200px" }}>
              <p style={styles.proTitle}>Incoming Transaction</p>
              {transactions.length !== 0 ? (
                <Col>
                  <Col>
                    <Table striped bordered hover>
                      <thead>
                        <tr style={{ color: "red" }}>
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
                            <td
                              style={
                                item.userStatus === "Not Active"
                                  ? styles.danger
                                  : styles.success
                              }
                            >
                              {item.userStatus}
                            </td>
                            <td
                              style={
                                item.paymentStatus === "Pending"
                                  ? styles.pending
                                  : styles.success
                              }
                            >
                              {item.paymentStatus}
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="none"
                                  id="dropdown-basic"
                                ></Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <center>
                                    <Dropdown.Item
                                      onClick={() => approve(item.id)}
                                      style={{ color: "#0ACF83" }}
                                    >
                                      Aproved
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => cancel(item.id)}
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
                      src="assets/nodata.png"
                      className="img-fluid"
                      style={{ width: "40%" }}
                      alt="empty"
                    />
                    {/* <div className="mt-3">No data product</div> */}
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
