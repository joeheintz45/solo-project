import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import CollabPost from '../CollabPost/CollabPost';
import ProfileType from '../ProfileType/ProfileType';
import './Home.css';
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
import MapBox from '../MapBox/MapBox';

class Home extends Component {
  state = {
    type_id: '',
    filtered: false,
    newPost: false,
    content: '',
    latitude: '',
    longitude: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_COLLAB_POSTS' });
    this.props.dispatch({ type: 'GET_TYPES' });
  }

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  getFilteredPosts = (event) => {
    console.log(
      'HOME LAT AND LNG: ',
      this.state.latitude,
      this.state.longitude
    );
    this.setState({
      filtered: true,
    });
    this.props.dispatch({ type: 'GET_FILTER_POSTS', payload: this.state });
  };

  getPosts = (event) => {
    this.setState({
      filtered: false,
    });
    this.props.dispatch({ type: 'GET_TYPES' });
  };

  newPosts = (event) => {
    if (this.state.newPost === false) {
      this.setState({
        newPost: true,
      });
    } else if (this.state.newPost === true) {
      this.setState({
        newPost: false,
      });
    }
  };

  sendPost = (event) => {
    console.log('click');
    this.setState({
      newPost: false,
    });
    this.props.dispatch({
      type: 'NEW_COLLAB_POST',
      payload: { collab: this.state, location: this.props.store.map },
    });
  };

  render() {
    let mapOrPost = <MapBox></MapBox>;
    let postBtn = (
      <Button variant="contained" color="primary" onClick={this.newPosts}>
        New Post
      </Button>
    );
    let filter = (
      <div>
        <FormControl className="size" variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">
            Select Type
          </InputLabel>
          <Select
            required
            onChange={this.handleChangeFor('type_id')}
            native
            label="Select Type"
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

        <div className="spacer">
          <Button
            variant="contained"
            color="secondary"
            onClick={this.getPosts}
            style={{ marginRight: '10px' }}
          >
            Reset
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={this.getFilteredPosts}
          >
            Filter
          </Button>
        </div>
      </div>
    );

    if (this.state.newPost === true) {
      mapOrPost = (
        <Card variant="outlined" style={{ width: '1000px', margin: 'auto' }}>
          <h3>New Post</h3>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                required
                type="text"
                onChange={this.handleChangeFor('content')}
                id="standard-textarea"
                variant="outlined"
                label="Content"
                placeholder="Content"
                multiline
                style={{
                  width: '90%',
                  marginTop: '25px',
                  marginBottom: '20px',
                }}
              />
              <div>
                <FormControl className="size" variant="outlined">
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Select Type
                  </InputLabel>
                  <Select
                    style={{ marginBottom: '20px' }}
                    required
                    onChange={this.handleChangeFor('type_id')}
                    native
                    label="Select Type"
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
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                style={{ marginBottom: '20px' }}
                variant="contained"
                color="primary"
                onClick={this.sendPost}
              >
                Post Collab
              </Button>
            </Grid>
          </Grid>
        </Card>
      );

      postBtn = (
        <Button variant="contained" color="secondary" onClick={this.newPosts}>
          Cancel
        </Button>
      );

      filter = <></>;
    }

    let postList = (
      <div>
        {this.props.store.post.map((item, index) => (
          <CollabPost index={index} item={item} />
        ))}
      </div>
    );

    if (this.state.filtered === true) {
      postList = (
        <div>
          {this.props.store.filter.map((item, index) => (
            <CollabPost index={index} item={item} />
          ))}
        </div>
      );
    }

    return (
      <div>
        <div className="center">
          {mapOrPost}
          <br />
          <div>{postBtn}</div>
          <br />
          {filter}
        </div>
        {postList}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Home);
