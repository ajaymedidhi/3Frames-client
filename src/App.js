import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css'; 

function App() {
  const [reloadList, setReloadList] = useState(false);

  const handleStudentAdded = () => {
    setReloadList(!reloadList);
  };

  const handleDelete = () => {
    setReloadList(!reloadList);
  };

  return (
    <div className="App">
      <h1 className='main-heading' >Student Management System</h1>
      <StudentForm onStudentAdded={handleStudentAdded} />
      <StudentList key={reloadList} onDelete={handleDelete} />
    </div>
  );
}

export default App;
