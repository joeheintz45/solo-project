import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

class MessageProfilePic extends Component {
  render() {
    return <Avatar src={this.props.item.profile_pic}></Avatar>;
  }
}

export default MessageProfilePic;
