import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from "./AddEmployee";
import { GetAllEmployees } from "../api";
import { ToastContainer } from "react-toastify";

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [employeeObj, setEmployeeObj] = useState(null);
  const [employeesData, setEmployeesData] = useState({
    employees: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalEmployees: 0,
      totalPages: 0,
    },
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const data = await GetAllEmployees(search, page, limit);
      setEmployeesData(data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchEmployees(term);
  };

  const handleUpdateEmployee = async (emp) => {
    setEmployeeObj(emp);
    setShowModal(true);
  };

  return (
    <Container fluid className="bg-dark text-light min-vh-100 py-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card bg="secondary" text="light" className="shadow-lg">
            <Card.Header className="text-center">
              <h1 className="display-6 mb-0">Employee Management App</h1>
            </Card.Header>

            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <Button
                    variant="dark"
                    onClick={() => setShowModal(true)}
                    className="mb-2"
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Employee
                  </Button>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Search Employees..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="bg-light text-dark"
                  />
                </Col>
              </Row>

              <EmployeeTable
                employees={employeesData.employees}
                pagination={employeesData.pagination}
                fetchEmployees={fetchEmployees}
                handleUpdateEmployee={handleUpdateEmployee}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <AddEmployee
        fetchEmployees={fetchEmployees}
        showModal={showModal}
        setShowModal={setShowModal}
        employeeObj={employeeObj}
      />

      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={3000}
        hideProgressBar={false}
      />
    </Container>
  );
};

export default EmployeeManagementApp;
