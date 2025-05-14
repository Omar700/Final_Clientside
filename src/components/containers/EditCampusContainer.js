/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import {
  fetchCampusThunk,
  editCampusThunk,
  fetchAllCampusesThunk
} from '../../store/thunks';

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      errors: {},
      redirect: false,
      redirectId: null
    };
  }

  // Fetch campus and fill form state
  componentDidMount() {
    const campusId = this.props.match.params.id;
    this.props.fetchCampus(campusId).then(() => {
      const { campus } = this.props;
      if (campus && campus.id) {
        const { name, address, description, imageUrl } = campus;
        this.setState({ name, address, description, imageUrl });
      }
    });
    this.props.fetchAllCampuses();
  }

  // Update form if campus data changes
  componentDidUpdate(prevProps) {
    const { campus } = this.props;
    if (campus && campus.id && prevProps.campus?.id !== campus.id) {
      const { name, address, description, imageUrl } = campus;
      this.setState({ name, address, description, imageUrl });
    }
  }

  validateField = (name, value) => {
    let errors = { ...this.state.errors };

    if (name === "name") {
      errors.name = value.trim() ? "" : "Campus name is required.";
    }
    if (name === "address") {
      errors.address = value.trim() ? "" : "Address is required.";
    }
    if (name === "description") {
      errors.description = value.trim() ? "" : "Description is required.";
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

    const { name, address, description, imageUrl } = this.state;

    this.validateField("name", name);
    this.validateField("address", address);
    this.validateField("description", description);

    if (Object.values(this.state.errors).some(e => e)) return;

    const campus = {
      id: this.props.match.params.id,
      name: name.trim(),
      address: address.trim(),
      description: description.trim(),
      imageUrl: imageUrl || undefined
    };

    try {
      const updatedCampus = await this.props.editCampus(campus);
      this.setState({
        redirect: true,
        redirectId: updatedCampus.id
      });
    } catch (error) {
      alert("Failed to update campus. Please check your input or try again.");
    }
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    if (!this.props.campus || !this.props.campus.id) {
      return <div>Loading campus...</div>;
    }

    return (
      <div>
        <EditCampusView
          name={this.state.name}
          address={this.state.address}
          description={this.state.description}
          imageUrl={this.state.imageUrl}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  campus: state.campus,
  allCampuses: state.allCampuses
});

const mapDispatch = (dispatch) => ({
  fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  editCampus: (campus) => dispatch(editCampusThunk(campus)),
  fetchAllCampuses: () => dispatch(fetchAllCampusesThunk())
});

export default connect(mapState, mapDispatch)(EditCampusContainer);
