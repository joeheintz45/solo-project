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
} from '@material-ui/core';
import './ProfileInit.css';
import EditProfile from '../EditProfile/EditProfile';
import ProfileType from '../ProfileType/ProfileType';

class ProfileInit extends Component {
  state = {
    display_name: '',
    bio: '',
    profile_pic: null,
    type_id: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_TYPES' });
  }

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    this.props.history.push('/home');
    this.props.dispatch({ type: 'POST_NEW_PROFILE', payload: this.state });
  };

  render() {
    return (
      <div>
        <Card variant="outlined" style={{ width: '800px', margin: 'auto' }}>
          <CardContent>
            <div>
              <h2>Edit Profile</h2>
              <Grid container spacing={6} styling={{ margin: 'auto' }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card style={{ height: '200px', width: '180px' }}>
                    <CardActionArea>
                      <img src={process.env.PUBLIC_URL + '/default.jpg'}></img>
                      {/* <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Add an Image
                  </Typography>
                </CardContent> */}
                    </CardActionArea>
                  </Card>
                  <br></br>
                  <div>
                    <TextField
                      type="text"
                      onChange={this.handleChangeFor('bio')}
                      id="standard-textarea"
                      variant="outlined"
                      label="Bio"
                      placeholder="Bio (350 characters)"
                      multiline
                      className="size-bio"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    required
                    type="text"
                    onChange={this.handleChangeFor('display_name')}
                    id="outlined-basic"
                    variant="outlined"
                    label="Display Name"
                    className="size"
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
                        value="age"
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
                  </div>
                  <br />

                  <br></br>
                </Grid>
              </Grid>
            </div>
            <br></br>
            <div className="button">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProfileInit);
