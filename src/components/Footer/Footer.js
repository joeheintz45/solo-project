import React from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer>
    {/* <ImageUpload /> */}
    &copy; Make Music Together
  </footer>
);

export default Footer;
