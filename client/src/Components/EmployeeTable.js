import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Badge,
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { DeleteEmployeeById } from "../api";
import { notify } from "../utils";

function EmployeeTable({
  employees,
  pagination,
  fetchEmployees,
  handleUpdateEmployee,
}) {
  const headers = ["Name", "Email", "Phone", "Department", "Actions"];
  const { currentPage, totalPages } = pagination;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (page) => {
    fetchEmployees("", page, 5);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const { success, message } = await DeleteEmployeeById(id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchEmployees();
    } catch (err) {
      console.error(err);
      notify("Failed to delete Employee", "error");
    }
  };

  const TableRow = ({ employee }) => (
    <tr className="align-middle">
      <td>
        <Link
          to={`/employee/${employee._id}`}
          className="text-decoration-none text-light"
        >
          {employee.name}
        </Link>
      </td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.department}</td>
      <td>
        <div className="d-flex">
          <Button
            variant="warning"
            size="sm"
            className="me-2 d-flex align-items-center"
            onClick={() => handleUpdateEmployee(employee)}
          >
            <i className="bi bi-pencil me-1"></i>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => handleDeleteEmployee(employee._id)}
          >
            <i className="bi bi-trash me-1"></i>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <Container fluid>
      <Row>
        <Col>
          {employees.length === 0 ? (
            <div className="text-center text-light py-4">
              <h4>No Employees Found</h4>
            </div>
          ) : (
            <>
              <Table striped hover variant="dark" responsive className="mb-4">
                <thead>
                  <tr>
                    {headers.map((header, i) => (
                      <th key={i}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <TableRow employee={emp} key={emp._id} />
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between align-items-center">
                <Badge bg="dark" text="light" className="fs-6">
                  Page {currentPage} of {totalPages}
                </Badge>

                <div className="d-flex">
                  <Button
                    variant="outline-light"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="me-2"
                  >
                    <i className="bi bi-chevron-left me-1"></i>
                    Previous
                  </Button>

                  {pageNumbers.map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "dark" : "outline-light"}
                      onClick={() => handlePagination(page)}
                      className="me-1"
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline-light"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="ms-2"
                  >
                    Next
                    <i className="bi bi-chevron-right ms-1"></i>
                  </Button>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeTable;
