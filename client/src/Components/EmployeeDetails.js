import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { GetEmployeeDetailsById } from "../api";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployeeDetails = async () => {
    try {
      setLoading(true);
      const data = await GetEmployeeDetailsById(id);
      setEmployee(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching employee details:", err);
      setError("Failed to fetch employee details");
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 bg-dark min-vh-100 pt-5">
        <Alert variant="danger" className="text-center">
          {error}
          <Button
            variant="outline-danger"
            className="ms-3"
            onClick={() => navigate("/employee")}
          >
            Back to Employees
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container className="mt-5 bg-dark min-vh-100 pt-5">
        <Alert variant="warning" className="text-center">
          Employee not found
          <Button
            variant="outline-warning"
            className="ms-3"
            onClick={() => navigate("/employee")}
          >
            Back to Employees
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="bg-dark min-vh-100 d-flex align-items-center justify-content-center p-4"
    >
      <Card
        bg="secondary"
        text="light"
        className="w-100 shadow-lg"
        style={{ maxWidth: "800px" }}
      >
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Employee Details</h2>
          <Button variant="outline-light" onClick={() => navigate("/employee")}>
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Button>
        </Card.Header>

        <Card.Body>
          <Row>
            <Col md={4} className="mb-3 mb-md-0">
              <Card.Img
                src={employee.profileImage || "/api/placeholder/300/300"}
                alt={employee.name}
                className="img-fluid rounded shadow"
                style={{
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            </Col>

            <Col md={8}>
              <h3 className="mb-4">{employee.name}</h3>

              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  Email
                </Col>
                <Col sm={8}>{employee.email}</Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  Phone
                </Col>
                <Col sm={8}>{employee.phone}</Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  Department
                </Col>
                <Col sm={8}>{employee.department}</Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  Salary
                </Col>
                <Col sm={8}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(employee.salary)}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeDetails;
