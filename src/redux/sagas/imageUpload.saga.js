import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postImage(action) {
  try {
    const config = {
      header: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/profile', action.payload, config);
    yield put({
      type: 'GET_COLLAB_POSTS',
    });
  } catch (err) {
    console.log(err);
  }
}

function* imageSaga() {
  yield takeLatest('POST_IMAGE', postImage);
}

export default imageSaga;
