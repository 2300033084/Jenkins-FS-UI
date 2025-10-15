import React from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ employee, editMode, handleChange, addEmployee, updateEmployee, resetForm }) => (
  <div>
    <h3>{editMode ? 'Edit Employee' : 'Add Employee'}</h3>
    <div>
      <input type="number" name="id" placeholder="ID" value={employee.id} onChange={handleChange} />
      <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} />
      <select name="gender" value={employee.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="MALE">MALE</option>
        <option value="FEMALE">FEMALE</option>
      </select>
      <select name="department" value={employee.department} onChange={handleChange}>
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="SALES">SALES</option>
        <option value="ENGINEERING">ENGINEERING</option>
      </select>
      <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} />
      <input type="text" name="contact" placeholder="Contact" value={employee.contact} onChange={handleChange} />
      <input type="number" name="salary" placeholder="Salary" value={employee.salary} onChange={handleChange} />
    </div>
    <div>
      {!editMode ? (
        <button onClick={addEmployee}>Add Employee</button>
      ) : (
        <>
          <button onClick={updateEmployee}>Update Employee</button>
          <button onClick={resetForm}>Cancel</button>
        </>
      )}
    </div>
  </div>
);

export default EmployeeForm;