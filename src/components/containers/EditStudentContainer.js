/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
==================================================*/
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import {
  editStudentThunk,
  fetchStudentThunk,
  fetchAllCampusesThunk
} from '../../store/thunks';

class EditStudentContainer extends Component {
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
    const studentId = this.props.match.params.id;
    this.props.fetchStudent(studentId).then((student) => {
      if (!student) return;
      const {
        firstName,
        lastName,
        email,
        imageUrl,
        gpa,
        campusId
      } = student;
      this.setState({
        firstName,
        lastName,
        email,
        imageUrl,
        gpa: gpa?.toString() || '',
        campusId: campusId?.toString() || ''
      });
    });
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
      const valid = !value || this.props.allCampuses.some(
        (campus) => campus.id.toString() === value
      );
      errors.campusId = valid ? '' : 'Campus ID does not exist.';
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

    const updatedStudent = {
      id: this.props.match.params.id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      imageUrl: imageUrl || undefined,
      gpa: gpa ? parseFloat(gpa) : null,
      campusId: campusId || null
    };

    try {
      await this.props.editStudent(updatedStudent);
      this.setState({ redirect: true, redirectId: updatedStudent.id });
    } catch (err) {
      alert('Update failed. Please try again.');
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <EditStudentView
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapState = (state) => ({
  allCampuses: state.allCampuses
});

const mapDispatch = (dispatch) => ({
  editStudent: (student) => dispatch(editStudentThunk(student)),
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  fetchAllCampuses: () => dispatch(fetchAllCampusesThunk())
});

export default connect(mapState, mapDispatch)(EditStudentContainer);
