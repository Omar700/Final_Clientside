import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk, fetchAllCampusesThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
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

  componentDidMount() {
    this.props.fetchAllCampuses();
  }

  validateAllFields = () => {
    const { name, address, description } = this.state;
    const errors = {};

    if (!name.trim()) {
      errors.name = "Campus name is required.";
    } else if (
      this.props.allCampuses.some(
        (campus) => campus.name.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      errors.name = "This campus name already exists.";
    }

    if (!address.trim()) {
      errors.address = "Address is required.";
    }

    if (!description.trim()) {
      errors.description = "Description is required.";
    }

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField = (name, value) => {
    let errors = { ...this.state.errors };

    if (name === "name") {
      if (!value.trim()) {
        errors.name = "Campus name is required.";
      } else if (
        this.props.allCampuses.some(
          (campus) => campus.name.toLowerCase() === value.trim().toLowerCase()
        )
      ) {
        errors.name = "This campus name already exists.";
      } else {
        delete errors.name;
      }
    }

    if (name === "address") {
      if (!value.trim()) errors.address = "Address is required.";
      else delete errors.address;
    }

    if (name === "description") {
      if (!value.trim()) errors.description = "Description is required.";
      else delete errors.description;
    }

    this.setState({ errors });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = this.validateAllFields();
    if (!isValid) return;

    const campus = {
      name: this.state.name.trim(),
      address: this.state.address.trim(),
      description: this.state.description.trim(),
      imageUrl: this.state.imageUrl || undefined
    };

    const newCampus = await this.props.addCampus(campus);

    this.setState({
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      errors: {},
      redirect: true,
      redirectId: newCampus.id
    });
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <NewCampusView
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
  allCampuses: state.allCampuses
});

const mapDispatch = (dispatch) => ({
  addCampus: (campus) => dispatch(addCampusThunk(campus)),
  fetchAllCampuses: () => dispatch(fetchAllCampusesThunk())
});

export default connect(mapState, mapDispatch)(NewCampusContainer);
