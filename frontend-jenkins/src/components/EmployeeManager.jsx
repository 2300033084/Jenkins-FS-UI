import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import config from './config.js'; // Changed from ../config.js

const EmployeeManager = () => {
  // ... the rest of your code stays exactly the same
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: '', name: '', gender: '', department: '',
    email: '', contact: '', salary: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedEmployee, setFetchedEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get(`${config.url}/all`);
      setEmployees(res.data);
    } catch (error) {
      setMessage('Failed to fetch employees.');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in employee) {
      if (!employee[key] || employee[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${config.url}/add`, employee);
      setMessage('Employee added successfully.');
      fetchAllEmployees();
      resetForm();
    } catch (error) {
      setMessage('Error adding employee.');
      console.error(error);
    }
  };

  const updateEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${config.url}/update`, employee);
      setMessage('Employee updated successfully.');
      fetchAllEmployees();
      resetForm();
    } catch (error) {
      setMessage('Error updating employee.');
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await axios.delete(`${config.url}/delete/${id}`);
      setMessage(res.data);
      fetchAllEmployees();
    } catch (error) {
      setMessage('Error deleting employee.');
      console.error(error);
    }
  };

  const getEmployeeById = async () => {
    try {
      const res = await axios.get(`${config.url}/get/${idToFetch}`);
      setFetchedEmployee(res.data);
      setMessage('');
    } catch (error) {
      setFetchedEmployee(null);
      setMessage('Employee not found.');
      console.error(error);
    }
  };

  const handleEdit = (emp) => {
    setEmployee(emp);
    setEditMode(true);
    setMessage(`Editing employee with ID ${emp.id}`);
  };

  const resetForm = () => {
    setEmployee({
      id: '', name: '', gender: '', department: '',
      email: '', contact: '', salary: ''
    });
    setEditMode(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
      <h2>Employee Management</h2>
      <hr />
      <EmployeeForm
        employee={employee}
        editMode={editMode}
        handleChange={handleChange}
        addEmployee={addEmployee}
        updateEmployee={updateEmployee}
        resetForm={resetForm}
      />
      <hr />
      <div>
        <h3>Get Employee By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={e => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button onClick={getEmployeeById}>Fetch</button>
        {fetchedEmployee && (
          <div>
            <h4>Employee Found:</h4>
            <pre>{JSON.stringify(fetchedEmployee, null, 2)}</pre>
          </div>
        )}
      </div>
      <hr />
      <EmployeeList
        employees={employees}
        handleEdit={handleEdit}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
};

export default EmployeeManager;