/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = ({ student }) => {
  if (!student || Object.keys(student).length === 0) {
    return <div>Loading student information...</div>;
  }

  return (
    <div>
      <h1>{student.firstName} {student.lastName}</h1>
      
      <img 
        src={student.imageUrl || 'https://placehold.co/200x200'} 
        alt={`${student.firstName}'s profile`} 
        width="200"
        height="200"
      />

      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>GPA:</strong> {student.gpa ?? 'N/A'}</p>

      <p><strong>Campus:</strong> {
        student.campus
          ? <Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>
          : "Not enrolled in a campus"
      }</p>

      <br />
      <Link to={`/editstudent/${student.id}`}>
        <button>Edit Student</button>
      </Link>
    </div>
  );
};

export default StudentView;
