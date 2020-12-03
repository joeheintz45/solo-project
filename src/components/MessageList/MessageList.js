import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MessageListItem from '../MessageListItem/MessageListItem';

class MessageList extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_MESSAGE_LIST' });
  }

  render() {
    return (
      <div>
        <h2>Messages</h2>
        {this.props.store.messageList.map((item, index) => (
          <MessageListItem key={index} item={item} />
        ))}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MessageList);
