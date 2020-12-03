import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import mapStoreToProps from '../../redux/mapStoreToProps';
import './CollabPost.css';
import { withRouter } from 'react-router-dom';

class CollabPost extends Component {
  handleClick = (event) => {
    console.log(this.props.item.user_id);
    this.props.history.push(`/profile-secondary/${this.props.item.user_id}`);
    this.props.dispatch({
      type: 'SET_SECONDARY_ID',
      payload: this.props.item,
    });
  };

  deletePost = (event) => {
    console.log(this.props.item.id);
    this.props.dispatch({
      type: 'DELETE_COLLAB_POST',
      payload: this.props.item.id,
    });
  };

  messageUser = (event) => {
    this.props.history.push(`/message/${this.props.item.user_id}`);
  };

  render() {
    let mesgOrDeleteBtn = (
      <Button color="primary" onClick={this.messageUser}>
        Message
      </Button>
    );

    if (this.props.item.user_id === this.props.store.user.id) {
      mesgOrDeleteBtn = (
        <Button color="secondary" onClick={this.deletePost}>
          Delete
        </Button>
      );
    }

    return (
      <div className="spacer">
        <Card variant="outlined" style={{ width: '1000px', margin: 'auto' }}>
          <CardHeader
            avatar={
              <Avatar src="/broken-image.jpg" onClick={this.handleClick} />
            }
            title={this.props.item.display_name}
            subheader={this.props.item.type}
          />
          <CardContent>
            <Typography variant="h5" component="h5">
              {this.props.item.content}
            </Typography>
            {mesgOrDeleteBtn}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(CollabPost));
