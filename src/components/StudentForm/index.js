import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const StudentForm = ({ onStudentAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    course: 'BTech',
    dob: ''
  });

  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false); // New state for the popup

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required';
    if (!formData.lastName.trim()) return 'Last name is required';
    if (!formData.dob) return 'Date of birth is required';
    if (new Date(formData.dob) > new Date()) return 'Date of birth cannot be in the future';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear the error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/students', formData);
      onStudentAdded();
      setFormData({
        firstName: '',
        lastName: '',
        course: 'BTech',
        dob: ''
      });
      setError('');
      setShowPopup(true); // Show popup after successful submission
    } catch (error) {
      console.error('Failed to add student', error);
      setError('Failed to add student. Please try again.');
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="BTech">BTech</option>
            <option value="BCA">BCA</option>
            <option value="MTECH">MTECH</option>
            <option value="MCA">MCA</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Student</button>

        {/* Display single error message */}
        {error && <p className="error">{error}</p>}
      </form>

      {/* Popup Modal */}
      {showPopup && (
        <div className="modal">
          <div className="modal-content">
            <p>Student added successfully!</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
