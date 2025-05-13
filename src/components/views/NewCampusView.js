/*==================================================
NewCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new campus page.
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
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar: {
    backgroundColor: '#11153e',
    shadows: ['none'],
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

const NewCampusView = (props) => {
  const { name, address, description, imageUrl, errors, handleChange, handleSubmit } = props;
  const classes = useStyles();

  return (
    <div>
      <h1>New Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{
              fontWeight: 'bold',
              fontFamily: 'Courier, sans-serif',
              fontSize: '20px',
              color: '#11153e'
            }}>
              Add a Campus
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

            <Button variant="contained" color="primary" type="submit" disabled={Object.keys(errors).length > 0}>
              Submit
            </Button>
            <br /><br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCampusView;
