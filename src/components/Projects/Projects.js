import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

class Projects extends Component {
  deleteProject = (event) => {
    this.props.dispatch({
      type: 'DELETE_PROJECT',
      payload: this.props.item.id,
    });
  };

  render() {
    return (
      <div>
        <Card variant="outlined" style={{ width: '900px', margin: 'auto' }}>
          <CardHeader
            avatar={
              <Avatar src="/broken-image.jpg" onClick={this.handleClick} />
            }
            title={this.props.item.header}
          />
          <CardContent>
            <Typography variant="h5" component="h5">
              {this.props.item.project_desc} <br />
              <br />
              <a href={this.props.item.project_link}>
                {this.props.item.project_link}
              </a>
            </Typography>
            <Button color="secondary" onClick={this.deleteProject}>
              Delete
            </Button>
          </CardContent>
        </Card>
        <br />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Projects);
