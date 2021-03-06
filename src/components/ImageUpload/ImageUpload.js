import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

class ImageUpload extends Component {
  handleFinishedUpload = (info) => {
    this.props.dispatch({ type: 'POST_IMAGE', payload: info.fileURL });
  };

  render() {
    const uploadOptions = {
      server: 'http://localhost:5000',
      signingUrlQueryParams: { uploadType: 'avatar' },
    };

    const s3Url = 'https://profile-pic-makemusictogether.s3.amazonaws.com';

    return (
      <DropzoneS3Uploader
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />
    );
  }
}

export default connect(mapStoreToProps)(ImageUpload);
