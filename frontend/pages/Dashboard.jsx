import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate 5-second data fetching delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div
        className="container my-5"
        style={{ display: loading ? "none" : "block" }}
      >
        <div className="min-h-[300px] bg-dark absolute w-full"></div>

        <h2 className="mb-3">Welcome, Divyanshu Singh</h2>
        <div>
          <button className="btn btn-primary me-2">Add Customer</button>
          <button className="btn btn-success">Add Order</button>
        </div>

        <main className="main-content relative rounded-lg">
          <div className="container-fluid py-4">
            <div className="row">
              {/* Card 1 */}
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">
                            Total Money Spent
                          </p>
                          <h5 className="font-weight-bolder">$53,000</h5>
                          <p className="mb-0">
                            <span className="text-success text-sm font-weight-bolder">
                              +55%
                            </span>{" "}
                            since yesterday
                          </p>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                          <i
                            className="ni ni-money-coins text-lg opacity-10"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">
                            Total Users
                          </p>
                          <h5 className="font-weight-bolder">2,300</h5>
                          <p className="mb-0">
                            <span className="text-success text-sm font-weight-bolder">
                              +3%
                            </span>{" "}
                            since last week
                          </p>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                          <i
                            className="ni ni-world text-lg opacity-10"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">
                            Total Orders
                          </p>
                          <h5 className="font-weight-bolder">462</h5>
                          <p className="mb-0">
                            <span className="text-danger text-sm font-weight-bolder">
                              -2%
                            </span>{" "}
                            since last quarter
                          </p>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                          <i
                            className="ni ni-paper-diploma text-lg opacity-10"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="container-fluid mt-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">All Users</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Customer ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Total Spent</th>
                      <th>Total Orders</th>
                      <th>Last Order Date</th>
                      <th>Signup Date</th>
                      <th>Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CUST123456</td>
                      <td>Ravi Sharma</td>
                      <td>ravi@example.com</td>
                      <td>9876543210</td>
                      <td>$1,200</td>
                      <td>5</td>
                      <td>2025-05-25</td>
                      <td>2024-11-10</td>
                      <td>
                        <span className="badge bg-success">Yes</span>
                      </td>
                    </tr>
                    <tr>
                      <td>CUST654321</td>
                      <td>Anjali Mehta</td>
                      <td>anjali@example.com</td>
                      <td>9123456780</td>
                      <td>$650</td>
                      <td>2</td>
                      <td>2025-04-18</td>
                      <td>2024-12-05</td>
                      <td>
                        <span className="badge bg-danger">No</span>
                      </td>
                    </tr>
                    <tr>
                      <td>CUST987654</td>
                      <td>Mohit Verma</td>
                      <td>mohit@example.com</td>
                      <td>9988776655</td>
                      <td>$2,450</td>
                      <td>10</td>
                      <td>2025-05-20</td>
                      <td>2024-10-01</td>
                      <td>
                        <span className="badge bg-success">Yes</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-5">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Orders</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Customer ID</th>
                      <th>Amount</th>
                      <th>Items</th>
                      <th>Order Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ORD001</td>
                      <td>CUST001</td>
                      <td>₹1,500</td>
                      <td>Shirt, Jeans</td>
                      <td>{new Date("2025-05-10").toLocaleDateString()}</td>
                      <td>
                        <span className="badge bg-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td>ORD002</td>
                      <td>CUST002</td>
                      <td>₹2,300</td>
                      <td>T-shirt, Shoes</td>
                      <td>{new Date("2025-05-22").toLocaleDateString()}</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>ORD003</td>
                      <td>CUST003</td>
                      <td>₹999</td>
                      <td>Cap, Socks</td>
                      <td>{new Date("2025-05-25").toLocaleDateString()}</td>
                      <td>
                        <span className="badge bg-danger">Cancelled</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-5">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white">
              <h5 className="mb-0">Campaigns</h5>
              <button className="btn btn-light text-dark fw-bold">
                + Add Campaign
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Campaign Name</th>
                      <th>Audience Size</th>
                      <th>Campaign Logic</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>High Spenders</td>
                      <td>1,250</td>
                      <td>Spend INR 10,000 AND visits 3</td>
                    </tr>
                    <tr>
                      <td>Inactive Users</td>
                      <td>980</td>
                      <td>Inactive for 90 days</td>
                    </tr>
                    <tr>
                      <td>Big Cart Abandoners</td>
                      <td>620</td>
                      <td>Spend INR 5,000 AND no order placed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
