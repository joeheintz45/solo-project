import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import CollabPost from '../CollabPost/CollabPost';
import { Select, FormControl, InputLabel, Button } from '@material-ui/core';
import ProfileType from '../ProfileType/ProfileType';
import './Home.css';

class Home extends Component {
  state = {
    type_id: '',
    filtered: false,
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

  render() {
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
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
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
          <br />
          <div className="spacer">
            <Button
              variant="contained"
              color="secondary"
              onClick={this.getPosts}
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
        {postList}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Home);
