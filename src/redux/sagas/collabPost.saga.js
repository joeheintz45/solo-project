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

function* postCollab(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/collab', action.payload);
    yield put({
      type: 'GET_COLLAB_POSTS',
    });
  } catch (err) {
    console.log(err);
  }
}

function* deletePost(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.delete(`/api/collab/delete/${action.payload}`);
    yield put({
      type: 'GET_COLLAB_POSTS',
    });
  } catch (err) {
    console.log(err);
  }
}

function* postSaga() {
  yield takeLatest('GET_COLLAB_POSTS', getPosts);
  yield takeLatest('NEW_COLLAB_POST', postCollab);
  yield takeLatest('DELETE_COLLAB_POST', deletePost);
}

export default postSaga;
