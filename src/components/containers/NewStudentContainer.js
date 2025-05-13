import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: '',
      campusId: '',
      errors: {},
      redirect: false,
      redirectId: null
    };
  }

  componentDidMount() {
    this.props.fetchAllCampuses();
  }

  validateField = (name, value) => {
    const errors = { ...this.state.errors };

    if ((name === 'firstName' || name === 'lastName') && !value.trim()) {
      errors[name] = `${name === 'firstName' ? 'First' : 'Last'} name is required.`;
    } else if (name === 'email') {
      const isValid = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      errors.email = isValid ? '' : 'Invalid email format.';
    } else if (name === 'gpa') {
      const num = parseFloat(value);
      errors.gpa = value === '' || (num >= 0 && num <= 4) ? '' : 'GPA must be between 0.0 and 4.0';
    } else if (name === 'campusId') {
      if (value.trim() === '') {
        errors.campusId = '';
      } else {
        const exists = this.props.allCampuses.some(c => c.id === Number(value));
        errors.campusId = exists ? '' : 'Campus ID does not exist.';
      }
    } else {
      errors[name] = '';
    }

    this.setState({ errors });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.validateField(name, value);
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { firstName, lastName, email, imageUrl, gpa, campusId } = this.state;

    ['firstName', 'lastName', 'email', 'gpa', 'campusId'].forEach((field) =>
      this.validateField(field, this.state[field])
    );

    if (Object.values(this.state.errors).some((e) => e)) return;

    const student = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      imageUrl: imageUrl || undefined,
      gpa: gpa ? parseFloat(gpa) : null,
      campusId: campusId.trim() === '' ? null : Number(campusId)
    };

    try {
      const newStudent = await this.props.addStudent(student);
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        gpa: '',
        campusId: '',
        redirect: true,
        redirectId: newStudent.id
      });
    } catch (err) {
      alert('Failed to add student.');
    }
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <NewStudentView
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        student={this.state}
        errors={this.state.errors}
      />
    );
  }
}

const mapState = (state) => ({
  allCampuses: state.allCampuses
});

const mapDispatch = (dispatch) => ({
  addStudent: (student) => dispatch(addStudentThunk(student)),
  fetchAllCampuses: () => dispatch(fetchAllCampusesThunk())
});

export default connect(mapState, mapDispatch)(NewStudentContainer);
