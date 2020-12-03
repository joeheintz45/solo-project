import React, { Component } from 'react';

class MessageProfileInfo extends Component {
  render() {
    return <p>{this.props.item.display_name}</p>;
  }
}

export default MessageProfileInfo;
