import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
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
  Avatar,
  CardHeader,
} from '@material-ui/core';
import MessageProfileInfo from '../MessageProfileInfo/MessageProfileInfo';
import MessageProfilePrimary from '../MessageProfilePrimary/MessageProfilePrimary';
import MessageProfilePic from '../MessageProfilePic/MessageProfilePic';

class MessageFormItem extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_PROFILE_SECONDARY' });
    this.props.dispatch({ type: 'GET_PROFILE_INFO' });
  }

  deleteMessage = (event) => {
    console.log('DELETE MESSAGE LOG', this.props.item);
    this.props.dispatch({
      type: 'DELETE_MESSAGE',
      payload: this.props.item,
    });
  };

  render() {
    let message = (
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Card
            variant="outlined"
            style={{
              width: '500px',
              height: '135px',
              marginBottom: '30px',
              marginLeft: '200px',
            }}
          >
            <CardHeader
              avatar={this.props.store.profileSecondary.map((item, index) => (
                <MessageProfilePic key={index} item={item} />
              ))}
              title={this.props.store.profileSecondary.map((item, index) => (
                <MessageProfileInfo key={index} item={item} />
              ))}
            />
            <CardContent>
              <Typography variant="h5" component="h5">
                {this.props.item.message}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );

    if (this.props.item.primary_user === this.props.store.user.id) {
      message = (
        <Card
          variant="outlined"
          style={{
            width: '500px',
            marginBottom: '30px',
            marginRight: '200px',
            marginLeft: '500px',
            float: 'right',
          }}
        >
          <CardHeader
            avatar={this.props.store.profilePrimary.map((item, index) => (
              <MessageProfilePic key={index} item={item} />
            ))}
            title={this.props.store.profilePrimary.map((item, index) => (
              <MessageProfilePrimary key={index} item={item} />
            ))}
          />
          <CardContent>
            <Typography variant="h5" component="h5">
              {this.props.item.message}
            </Typography>
          </CardContent>
          <Button color="secondary" onClick={this.deleteMessage}>
            Delete
          </Button>
        </Card>
      );
    }

    return <div>{message}</div>;
  }
}

export default connect(mapStoreToProps)(MessageFormItem);
