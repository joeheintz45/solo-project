import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Avatar } from '@material-ui/core';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Make Music Together</h2>
      </Link>
      <div className="nav-right">
        <Link className="nav-link" to="/home">
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            <Link className="nav-link" to="/message">
              Messages
            </Link>
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/profile">
          Profile
          {/* <Avatar
            style={{ height: '20px', width: '20px' }}
            className="profile"
            src="/broken-image.jpg"
          /> */}
        </Link>
        <LogOutButton className="nav-link" />
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
