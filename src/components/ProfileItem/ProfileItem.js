import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileItem extends Component {
  render() {
    return <div>{this.props.item.display_name}</div>;
  }
}

export default ProfileItem;
