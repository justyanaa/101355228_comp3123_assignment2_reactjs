import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({ firstName: '', lastName: '', email: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:3001/employees', employee, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            navigate('/home');
        })
        .catch(err => console.log(err));
    }

    const handleCancel = () => {
        navigate('/home');
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#a0a0a0' }}>
            <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                <h2 className='mb-3'>Save New Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="firstName" 
                            name="firstName" 
                            value={employee.firstName} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="lastName" 
                            name="lastName" 
                            value={employee.lastName} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            value={employee.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
