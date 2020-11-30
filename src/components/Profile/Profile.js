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
import ProfileItem from '../ProfileItem/ProfileItem';
import Projects from '../Projects/Projects';

class Profile extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_PROFILE_INFO' });
    this.props.dispatch({ type: 'GET_PROJECTS' });
  }

  render() {
    return (
      <div>
        <div>
          {this.props.store.profilePrimary.map((item, index) => (
            <ProfileItem key={index} item={item} />
          ))}
        </div>
        <br />
        <div>
          {this.props.store.projects.map((item, index) => (
            <Projects key={index} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Profile);
