import { Avatar } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileItem extends Component {
  render() {
    return (
      <div>
        <Avatar src="/broken-image.jpg" />
        {this.props.item.display_name} <br />
        {this.props.item.bio}
      </div>
    );
  }
}

export default ProfileItem;
