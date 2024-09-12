import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletionMessage, setDeletionMessage] = useState(''); // State for deletion message

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch students', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setDeletionMessage('Student has been deleted successfully.');
      
      setStudents(students.filter((student) => student._id !== id));

      setTimeout(() => {
        setDeletionMessage('');
      }, 3000);
    } catch (error) {
      console.error('Failed to delete student', error);
    }
  };

  if (loading) return <p className='student-notfound'>Loading students...</p>;
  if (students.length === 0) return <p className='student-notfound'>No students found</p>;

  return (
    <div>
      <h2 className="student-heading">Students List</h2>

      {/* Display the deletion message */}
      {deletionMessage && <p className="deletion-message">{deletionMessage}</p>}

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Course</th>
              <th>Date of Birth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.course}</td>
                <td>{new Date(student.dob).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
