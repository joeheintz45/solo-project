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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditProfile from '../EditProfile/EditProfile';
import './ProfileItem.css';

class ProfileItem extends Component {
  render() {
    return (
      <div className="profile">
        {' '}
        <div>
          <h2>{this.props.item.display_name}'s Profile</h2>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Card
                style={{
                  height: '250px',
                  width: '180px',
                  marginLeft: '50px',
                  marginTop: '25px',
                }}
              >
                <CardHeader subheader="Profile Picture" />
                <CardActionArea>
                  <img src={this.props.item.profile_pic}></img>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                style={{
                  marginTop: '20px',
                  marginRight: '50px',
                  paddingBottom: '20px',
                  padding: '5px',
                }}
              >
                <CardHeader subheader="Display Name" />
                {this.props.item.display_name}
              </Card>
              <Card
                style={{
                  marginTop: '20px',
                  marginRight: '50px',
                  paddingBottom: '20px',
                  padding: '5px',
                }}
              >
                <CardHeader subheader="Musician Type(s)" />
                {this.props.item.type}
              </Card>
              <Card
                style={{
                  marginTop: '20px',
                  marginRight: '50px',
                  paddingBottom: '20px',
                  padding: '5px',
                }}
              >
                <CardHeader subheader="Bio" />
                {this.props.item.bio}
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default ProfileItem;
