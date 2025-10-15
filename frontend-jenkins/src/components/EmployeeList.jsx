import React from 'react';

const EmployeeList = ({ employees, handleEdit, deleteEmployee }) => (
  <div>
    <h3>All Employees</h3>
    {employees.length === 0 ? (
      <p>No employees found.</p>
    ) : (
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.gender}</td>
              <td>{emp.department}</td>
              <td>{emp.email}</td>
              <td>{emp.contact}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default EmployeeList;