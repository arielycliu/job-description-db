import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'

export default function Form({ }) {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [pay, setPay] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e, setFunction) => {
        setFunction(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/add_description', { 
                "company": company,
                "role": role,
                "responsibilities": responsibilities,
                "qualifications": qualifications,
                "pay": pay
            });
            setMessage(response.data.message);
            setCompany('');
            setRole('');
            setResponsibilities('');
            setQualifications('');
            setPay('');
        } catch (error) {
            setMessage('Error adding job data');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add Description</h2>
            <form onSubmit={handleSubmit} className="job-form">
                <label className="job-label">
                    Company
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => handleChange(e, setCompany)}
                        placeholder="Enter company name"
                    />
                </label>
                <label className="job-label">
                    Role
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => handleChange(e, setRole)}
                        placeholder="Enter role name"
                    />
                </label>
                <label className="job-label">
                    Qualifications
                    <textarea
                        type="text"
                        value={qualifications}
                        onChange={(e) => handleChange(e, setQualifications)}
                        placeholder="Enter qualifications"
                    />
                </label>
                <label className="job-label">
                    Responsibilities
                    <textarea
                        type="text"
                        value={responsibilities}
                        onChange={(e) => handleChange(e, setResponsibilities)}
                        placeholder="Enter responsibilities"
                    />
                </label>
                <label className="job-label">
                    Pay
                    <input
                        type="numeric"
                        value={pay}
                        onChange={(e) => handleChange(e, setPay)}
                        placeholder="Enter pay amount"
                    />
                </label>
                <button type="submit" id="add-btn">Add Job Data</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
