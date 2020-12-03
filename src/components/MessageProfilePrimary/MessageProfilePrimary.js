import React, { Component } from 'react';

class MessageProfilePrimary extends Component {
  render() {
    return <p>{this.props.item.display_name}</p>;
  }
}

export default MessageProfilePrimary;
