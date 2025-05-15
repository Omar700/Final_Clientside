/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, unassignStudent  } = props; // renamed prop

  if (!campus) {
    return <div>Loading campus information...</div>;
  }

  const hasStudents = Array.isArray(campus.students) && campus.students.length > 0;

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img
        src={campus.imageUrl || "https://placehold.co/300x200"}
        alt={`${campus.name} campus`}
        width="300"
      />
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      <h3>Enrolled Students:</h3>
      {!hasStudents ? (
        <p>No students are currently enrolled at this campus.</p>
      ) : (
        campus.students.map((student) => {
          let name = student.firstName + " " + student.lastName;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <button onClick={() => unassignStudent(student)}>Remove Student</button> {/* now unassigns */}
            </div>
          );
        })
      )}

      <br />
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
      &nbsp;

      <br /><br />
      <Link to={`/campus/${campus.id}/addstudent`}>
      <button>Add Student</button>
    </Link>
    </div>
  );
};

export default CampusView;
