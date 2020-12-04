import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.history.push('/init');

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <TextField
            label="Username"
            placeholder="Username"
            variant="outlined"
            type="text"
            name="username"
            value={this.state.username}
            required
            onChange={this.handleInputChangeFor('username')}
          />
        </div>
        <br></br>
        <div>
          <TextField
            label="Password"
            placeholder="Password"
            variant="outlined"
            type="password"
            name="password"
            value={this.state.password}
            required
            onChange={this.handleInputChangeFor('password')}
          />
        </div>
        <br></br>
        <div>
          <Button
            className="btn"
            type="submit"
            name="submit"
            variant="contained"
            color="primary"
            value="Register"
          >
            Register
          </Button>
        </div>
      </form>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(RegisterForm));
