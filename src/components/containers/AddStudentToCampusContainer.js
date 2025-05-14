import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchCampusThunk,
  fetchAllStudentsThunk,
  editStudentThunk,
  addStudentThunk
} from '../../store/thunks';
import AddStudentToCampusView from '../views/AddStudentToCampusView';

class AddStudentToCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStudentId: '',
      newStudent: {
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        gpa: '',
      },
      errors: {},
      redirect: false,
      redirectId: null
    };
  }

  async componentDidMount() {
    await this.props.fetchCampus(this.props.match.params.id);
    await this.props.fetchAllStudents();
  }

  handleDropdownChange = (e) => {
    this.setState({ selectedStudentId: e.target.value });
  };

  handleAssignExisting = async () => {
    const student = this.props.students.find(s => s.id === Number(this.state.selectedStudentId));
    if (student) {
      const updated = { ...student, campusId: this.props.campus.id };
      await this.props.editStudent(updated);
      this.setState({ redirect: true, redirectId: student.id });
    }
  };

  handleNewInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newStudent: {
        ...this.state.newStudent,
        [name]: value
      }
    });
  };

  handleCreateNew = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, imageUrl, gpa } = this.state.newStudent;

    const newStudent = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      imageUrl: imageUrl || undefined,
      gpa: gpa ? parseFloat(gpa) : null,
      campusId: this.props.campus.id,
    };

    try {
      const student = await this.props.addStudent(newStudent);
      this.setState({ redirect: true, redirectId: student.id });
    } catch (err) {
      alert("Failed to add new student.");
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    if (!this.props.campus) {
      return <div>Loading campus information...</div>;
    }

    return (
      <AddStudentToCampusView
        campus={this.props.campus}
        students={this.props.students}
        selectedStudentId={this.state.selectedStudentId}
        handleDropdownChange={this.handleDropdownChange}
        handleAssignExisting={this.handleAssignExisting}
        newStudent={this.state.newStudent}
        handleNewInputChange={this.handleNewInputChange}
        handleCreateNew={this.handleCreateNew}
        errors={this.state.errors}
      />
    );
  }
}

const mapState = (state) => ({
  students: state.allStudents,
  campus: state.campus,
});

const mapDispatch = (dispatch) => ({
  fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
  editStudent: (student) => dispatch(editStudentThunk(student)),
  addStudent: (student) => dispatch(addStudentThunk(student)),
});

export default connect(mapState, mapDispatch)(AddStudentToCampusContainer);
