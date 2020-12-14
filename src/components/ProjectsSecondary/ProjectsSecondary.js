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
import MessageProfilePic from '../MessageProfilePic/MessageProfilePic';

class ProjectsSecondary extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_PROFILE_SECONDARY' });
  }

  deleteProject = (event) => {
    this.props.dispatch({
      type: 'DELETE_PROJECT',
      payload: this.props.item.id,
    });
  };

  render() {
    let deleteBtn = (
      <Button color="secondary" onClick={this.deleteProject}>
        Delete
      </Button>
    );

    if (this.props.store.user.id !== this.props.item.profile_id) {
      deleteBtn = <></>;
    }

    return (
      <div>
        <Card variant="outlined" style={{ width: '900px', margin: 'auto' }}>
          <CardHeader
            avatar={this.props.store.profileSecondary.map((item, index) => (
              <MessageProfilePic item={item} index={index} />
            ))}
            onClick={this.handleClick}
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
            {deleteBtn}
            <div></div>
          </CardContent>
        </Card>
        <br />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProjectsSecondary);
