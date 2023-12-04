import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:3001/employees', {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => {
            setEmployees(response.data);
        })
        .catch(error => console.log(error));
    }, []);

    const deleteEmployee = (employeeId) => {
        const token = localStorage.getItem('token');
    
        axios.delete(`http://localhost:3001/employees/${employeeId}`, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(() => {
            setEmployees(employees.filter(employee => employee._id !== employeeId));
        })
        .catch(error => console.log(error));
    };

    return (
        <div style={{backgroundColor: "#a0a0a0"}} className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
            <h1>Employee List</h1>
            <Link to='/add-employee' className="btn btn-primary my-3">Add Employee</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(employee._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to='/login' className="btn btn-light my-5">Logout</Link>
        </div>
    );
}

export default Home;
