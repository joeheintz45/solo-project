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
  state = {
    edit: false,
  };

  editProfile = (event) => {
    if (this.state.edit === false) {
      this.setState({
        edit: true,
      });
    } else if (this.state.edit === true) {
      this.setState({
        edit: false,
      });
    }
  };

  render() {
    let profile = (
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

        <Button
          style={{ marginTop: '25px' }}
          color="primary"
          onClick={this.editProfile}
        >
          Edit Profile
        </Button>
      </div>
    );
    if (this.state.edit === true) {
      profile = <EditProfile edit={this.editProfile}></EditProfile>;
    }

    return <div className="profile">{profile}</div>;
  }
}

export default ProfileItem;
