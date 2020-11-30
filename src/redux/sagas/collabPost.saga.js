import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getPosts(action) {
  try {
    const response = yield axios.get('/api/collab');
    console.log(response.data);
    yield put({
      type: 'SET_POSTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* postSaga() {
  yield takeLatest('GET_COLLAB_POSTS', getPosts);
}

export default postSaga;
