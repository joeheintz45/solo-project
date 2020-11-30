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

class Profile extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_PROFILE_INFO' });
    this.props.dispatch({ type: 'GET_PROJECTS' });
  }

  render() {
    return (
      <div>
        {this.props.store.profilePrimary.map((item, index) => (
          <ProfileItem key={index} item={item} />
        ))}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Profile);
