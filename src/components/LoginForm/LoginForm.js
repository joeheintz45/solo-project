import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/home');
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.login}>
        <h2>Login</h2>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h3>
        )}
        <div>
          <TextField
            label="Username"
            placeholder="Username"
            type="text"
            name="username"
            variant="outlined"
            required
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
        </div>
        <br></br>
        <div>
          <TextField
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            variant="outlined"
            required
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
        </div>
        <br></br>
        <div>
          <Button
            className="btn"
            type="submit"
            name="submit"
            value="Log In"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </div>
      </form>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(LoginForm));
