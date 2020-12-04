import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MessageFormItem from '../MessageFormItem.js/MessageFormItem';
import {
  TextField,
  InputLabel,
  Select,
  FormControl,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
import './MessageForm.css';

class MessageForm extends Component {
  state = {
    message: null,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MESSAGES',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'GET_SECONDARY_PROFILE',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({ type: 'GET_PROFILE_INFO' });
  }

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  sendMessage = (event) => {
    console.log('PARAM ID: ', this.props.match.params.id);
    if (this.state.message === null) {
      alert('Please fill the message field');
    } else {
      this.props.dispatch({
        type: 'POST_MESSAGE',
        payload: { message: this.state, id: this.props.match.params.id },
      });
      this.setState({
        message: '',
      });
      this.props.dispatch({
        type: 'GET_MESSAGES',
        payload: this.props.match.params.id,
      });
    }
  };

  render() {
    return (
      <div>
        {this.props.store.message.map((item, index) => (
          <MessageFormItem key={index} item={item} />
        ))}
        <Card
          variant="outlined"
          style={{ width: '1000px', margin: 'auto', marginTop: '20px' }}
        >
          <h4 style={{ marginLeft: '25px' }}>Send a Message</h4>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                required
                type="text"
                onChange={this.handleChangeFor('message')}
                id="standard-textarea"
                variant="outlined"
                label="Message"
                placeholder="Message"
                value={this.state.message}
                multiline
                style={{
                  width: '90%',
                  marginTop: '25px',
                  marginBottom: '5px',
                  marginLeft: '40px',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <div className="center-btn">
                <Button
                  style={{ marginRight: '80px', marginBottom: '20px' }}
                  variant="contained"
                  color="primary"
                  onClick={this.sendMessage}
                >
                  Send
                </Button>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MessageForm);
