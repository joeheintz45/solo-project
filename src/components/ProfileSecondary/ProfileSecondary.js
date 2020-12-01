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
} from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Projects from '../Projects/Projects';
import ProfileItemSecondary from '../ProfileItemSecondary/ProfileItemSecondary';

class Profile extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_SECONDARY_PROFILE',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'GET_SECONDARY_PROJECTS',
      payload: this.props.match.params.id,
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.props.store.profileSecondary.map((item, index) => (
            <ProfileItemSecondary key={index} item={item} />
          ))}
        </div>
        <br />
        <div className="center-button"></div>
        <div>
          {this.props.store.projectsSecondary.map((item, index) => (
            <Projects key={index} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Profile);
