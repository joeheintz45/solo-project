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

class CollabPost extends Component {
  handleClick = (event) => {
    console.log(this.props.item.id);
  };

  render() {
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
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CollabPost);
