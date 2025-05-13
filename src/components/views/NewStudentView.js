/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formContainer: {  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
    padding: '20px'
  },
  formTitle: {
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
  error: {
    color: 'red',
    fontSize: '0.9em'
  }
}));

const NewStudentView = (props) => {
  const { handleChange, handleSubmit, student, errors } = props;
  const classes = useStyles();

  const isDisabled =
    !student.firstName.trim() ||
    !student.lastName.trim() ||
    !student.email.trim() ||
    !student.gpa.trim() ||
    Object.values(errors).some((e) => e);

  return (
    <div>
      <h1>New Student</h1>

      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography style={{
            fontWeight: 'bold',
            fontFamily: 'Courier, sans-serif',
            fontSize: '20px',
            color: '#11153e'
          }}>
            Add a Student
          </Typography>
        </div>

        <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
          <input type="text" name="firstName" value={student.firstName} onChange={handleChange} />
          {errors.firstName && <div className={classes.error}>{errors.firstName}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
          <input type="text" name="lastName" value={student.lastName} onChange={handleChange} />
          {errors.lastName && <div className={classes.error}>{errors.lastName}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
          <input type="text" name="email" value={student.email} onChange={handleChange} />
          {errors.email && <div className={classes.error}>{errors.email}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
          <input type="text" name="imageUrl" value={student.imageUrl} onChange={handleChange} />
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>GPA (0.0 - 4.0): </label>
          <input type="text" name="gpa" value={student.gpa} onChange={handleChange} />
          {errors.gpa && <div className={classes.error}>{errors.gpa}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus ID: </label>
          <input type="text" name="campusId" value={student.campusId} onChange={handleChange} />
          {errors.campusId && <div className={classes.error}>{errors.campusId}</div>}
          <br /><br />

          <Button variant="contained" color="primary" type="submit" disabled={isDisabled}>
            Submit
          </Button>
          <br /><br />
        </form>
      </div>
    </div>
  );
};

export default NewStudentView;
