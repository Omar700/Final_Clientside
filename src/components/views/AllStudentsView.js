/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";

const AllStudentsView = (props) => {
  const { students, deleteStudent } = props;

  // If there is no student, display a message
  if (!students.length) {
    return (
      <div>
        <p>There are no students.</p>
        <Link to={`/newstudent`}>
          <button>Add New Student</button>
        </Link>
      </div>
    );
  }

  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1>All Students</h1>

      {students.map((student) => {
        let name = student.firstName + " " + student.lastName;
        return (
          <div key={student.id} style={{ marginBottom: '20px' }}>
            <img
              src={student.imageUrl || "https://placehold.co/150x150"}
              alt={`${name}'s profile`}
              width="150"
              height="150"
            />
            <h2>
              <Link to={`/student/${student.id}`}>{name}</Link>
            </h2>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>GPA:</strong> {student.gpa ?? "N/A"}</p>
            <p>
              <strong>Campus:</strong>{" "}
              {student.campus ? (
                <Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>
              ) : (
                "Not enrolled"
              )}
            </p>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
            <hr />
          </div>
        );
      })}

      <br />
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      <br /><br />
    </div>
  );
};

export default AllStudentsView;
