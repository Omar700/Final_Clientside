/*==================================================
EditCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the edit campus page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
    padding: '20px',
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
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

const EditCampusView = (props) => {
  const {
    name,
    address,
    description,
    imageUrl,
    errors,
    handleChange,
    handleSubmit
  } = props;

  const classes = useStyles();

  return (
    <div>
      <h1>Edit Campus</h1>

      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography style={{
            fontWeight: 'bold',
            fontFamily: 'Courier, sans-serif',
            fontSize: '20px',
            color: '#11153e'
          }}>
            Update Campus Information
          </Typography>
        </div>
        <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Name: </label>
          <input type="text" name="name" value={name} onChange={handleChange} />
          {errors.name && <div className={classes.error}>{errors.name}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Address: </label>
          <input type="text" name="address" value={address} onChange={handleChange} />
          {errors.address && <div className={classes.error}>{errors.address}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Description: </label>
          <input type="text" name="description" value={description} onChange={handleChange} />
          {errors.description && <div className={classes.error}>{errors.description}</div>}
          <br /><br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
          <input type="text" name="imageUrl" value={imageUrl} onChange={handleChange} />
          <br /><br />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              !name.trim() ||
              !address.trim() ||
              !description.trim() ||
              Object.values(errors).some(e => e)
            }
          >
            Update
          </Button>
          <br /><br />
        </form>
      </div>
    </div>
  );
};

export default EditCampusView;
