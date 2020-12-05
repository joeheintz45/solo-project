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
  Paper,
  Container,
  CardHeader,
} from '@material-ui/core';
import ProfileType from '../ProfileType/ProfileType';

class EditProfile extends Component {
  state = {
    type_id: null,
    bio: '',
    display_name: null,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_TYPES' });
    this.props.dispatch({ type: 'GET_PROFILE_INFO' });
  }

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  updateProfile = (event) => {
    if (this.state.display_name === null) {
      alert('Please fill out the Display Name!');
    } else if (this.state.type_id === null) {
      alert('Please select a musician type!');
    } else {
      this.props.dispatch({ type: 'PUT_PROFILE', payload: this.state });
      this.props.edit();
    }
  };

  cancel = (event) => {
    this.props.edit();
  };

  render() {
    return (
      <div>
        <h2>Edit Profile</h2>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Card
              style={{ height: '250px', width: '180px', marginLeft: '25px' }}
            >
              <CardActionArea>
                <CardHeader subheader="Profile Picture" />
                <img src={this.props.store.profilePrimary[0].profile_pic}></img>
                {/* <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Add an Image
                  </Typography>
                </CardContent> */}
              </CardActionArea>
            </Card>
            <br></br>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Display Name"
              className="size"
              onChange={this.handleChangeFor('display_name')}
            />
            <br />
            <br />
            <div>
              <FormControl className="size" variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Type
                </InputLabel>
                <Select
                  required
                  onChange={this.handleChangeFor('type_id')}
                  native
                  label="Type"
                  value={this.state.type_id}
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option value=""></option>
                  {this.props.store.type.map((item, index) => (
                    <ProfileType key={index} item={item} />
                  ))}
                </Select>
              </FormControl>
              <div>
                <br></br>
                <TextField
                  id="standard-textarea"
                  variant="outlined"
                  label="Bio"
                  placeholder="Bio (350 characters)"
                  multiline
                  style={{ width: '80%' }}
                  onChange={this.handleChangeFor('bio')}
                />
              </div>
            </div>
            <br />

            <br></br>
            <Grid item xs={12}>
              <Button onClick={this.cancel} style={{ marginRight: '25px' }}>
                Cancel
              </Button>
              <Button color="primary" onClick={this.updateProfile}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditProfile);
