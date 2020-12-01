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
              <Grid container spacing={6}>
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
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    style={{ width: '52%' }}
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
                        style={{ width: '150%' }}
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
                      <TextField
                        type="text"
                        onChange={this.handleChangeFor('bio')}
                        id="standard-textarea"
                        variant="outlined"
                        label="Bio"
                        placeholder="Bio (350 characters)"
                        multiline
                        style={{ width: '150%', marginTop: '25px' }}
                      />
                    </div>
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
