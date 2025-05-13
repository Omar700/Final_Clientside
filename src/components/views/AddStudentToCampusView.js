/*==================================================
AddStudentToCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to assign or create a student for a given campus.
==================================================*/
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
    padding: '20px',
    marginTop: '30px',
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px',
  },
  error: {
    color: 'red',
    fontSize: '0.9em',
  },
}));

const AddStudentToCampusView = (props) => {
  const {
    campus,
    students,
    selectedStudentId,
    handleDropdownChange,
    handleAssignExisting,
    newStudent,
    handleNewInputChange,
    handleCreateNew,
    errors
  } = props;

  const classes = useStyles();

  const isDisabled =
    !newStudent.firstName.trim() ||
    !newStudent.lastName.trim() ||
    !newStudent.email.trim() ||
    !newStudent.gpa.trim() ||
    Object.values(errors).some((e) => e);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Add Student to {campus.name}</h1>

      {/* Assign Existing Student Section */}
      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography
            style={{
              fontWeight: 'bold',
              fontFamily: 'Courier, sans-serif',
              fontSize: '20px',
              color: '#11153e',
            }}
          >
            Assign Existing Student
          </Typography>
        </div>
        <div style={{ textAlign: 'center' }}>
          <label style={{ fontWeight: 'bold', color: '#11153e' }}>Select Student: </label>
          <select
            value={selectedStudentId}
            onChange={handleDropdownChange}
            style={{ width: '80%', padding: '5px' }}
          >
            <option value="">-- Choose a student --</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
          <br /><br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssignExisting}
            disabled={!selectedStudentId}
          >
            Assign Student
          </Button>
        </div>
      </div>

      {/* Create and Assign New Student Section */}
      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography
            style={{
              fontWeight: 'bold',
              fontFamily: 'Courier, sans-serif',
              fontSize: '20px',
              color: '#11153e',
            }}
          >
            Create and Assign New Student
          </Typography>
        </div>
        <form style={{ textAlign: 'center' }} onSubmit={handleCreateNew}>
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
          <input type="text" name="firstName" value={newStudent.firstName} onChange={handleNewInputChange} />
          {errors.firstName && <div className={classes.error}>{errors.firstName}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
          <input type="text" name="lastName" value={newStudent.lastName} onChange={handleNewInputChange} />
          {errors.lastName && <div className={classes.error}>{errors.lastName}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
          <input type="text" name="email" value={newStudent.email} onChange={handleNewInputChange} />
          {errors.email && <div className={classes.error}>{errors.email}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
          <input type="text" name="imageUrl" value={newStudent.imageUrl} onChange={handleNewInputChange} />
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>GPA (0.0 - 4.0): </label>
          <input type="text" name="gpa" value={newStudent.gpa} onChange={handleNewInputChange} />
          {errors.gpa && <div className={classes.error}>{errors.gpa}</div>}
          <br /><br />

          <Button variant="contained" color="primary" type="submit" disabled={isDisabled}>
            Create + Assign
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentToCampusView;
