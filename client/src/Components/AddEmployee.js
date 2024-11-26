import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Only needed Bootstrap components

import { notify } from "../utils";
import { CreateEmployee, UpdateEmployeeById } from "../api";

function AddEmployee({ showModal, setShowModal, fetchEmployees, employeeObj }) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    if (employeeObj) {
      setEmployee(employeeObj);
      setUpdateMode(true);
    }
  }, [employeeObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, profileImage: e.target.files[0] });
  };

  const resetEmployeeStates = () => {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      profileImage: null,
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = updateMode
        ? await UpdateEmployeeById(employee, employee._id)
        : await CreateEmployee(employee);
      console.log("create OR update ", success, message);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setShowModal(false);
      resetEmployeeStates();
      fetchEmployees();
      setUpdateMode(false);
    } catch (err) {
      console.error(err);
      notify("Failed to create Employee", "error");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUpdateMode(false);
    resetEmployeeStates();
  };

  return (
    <Modal
      show={showModal}
      onHide={handleModalClose}
      centered
      className="bg-dark text-dark"
    >
      {" "}
      {/* Dark theme */}
      <Modal.Header closeButton>
        <Modal.Title>
          {updateMode ? "Update Employee" : "Add Employee"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddEmployee}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={employee.department}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSalary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              name="profileImage"
              onChange={handleFileChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            {" "}
            {/* Align buttons to the right */}
            <Button
              variant="secondary"
              onClick={handleModalClose}
              className="me-2"
            >
              Cancel
            </Button>
            <Button variant="dark" type="submit">
              {" "}
              {/* Dark button */}
              {updateMode ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddEmployee;
