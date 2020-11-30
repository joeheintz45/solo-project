import React, { Component } from 'react';

class ProfileType extends Component {
  render() {
    return <option value={this.props.item.id}>{this.props.item.type}</option>;
  }
}

export default ProfileType;
