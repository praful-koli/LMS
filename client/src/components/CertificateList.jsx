// src/components/IssueCertificate.js
import React, { useState } from 'react';
import axios from 'axios';

const IssueCertificate = () => {
    const [userId, setUserId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [certificateData, setCertificateData] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/certificates/issue', {
                userId,
                courseId,
                certificateData: JSON.parse(certificateData), // Assuming certificateData is a JSON string
            });
            setMessage('Certificate issued successfully!');
        } catch (error) {
            console.error("Error issuing certificate:", error);
            setMessage('Failed to issue certificate.');
        }
    };

    return (
        <div>
            <h2>Issue Certificate</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Course ID:</label>
                    <input
                        type="text"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Certificate Data (JSON):</label>
                    <textarea
                        value={certificateData}
                        onChange={(e) => setCertificateData(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Issue Certificate</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default IssueCertificate;