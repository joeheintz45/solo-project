import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getProfile(action) {
  try {
    const response = yield axios.get('/api/profile');
    console.log(response.data);
    yield put({
      type: 'SET_PROFILE_PRIMARY',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* postProfile(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/profile', action.payload);
    yield put({
      type: 'GET_PROFILE_INFO',
    });
  } catch (err) {
    console.log(err);
  }
}

function* putProfile(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.put('/api/profile/edit', action.payload);
    yield put({
      type: 'GET_PROFILE_INFO',
    });
  } catch (err) {
    console.log(err);
  }
}

function* newProfileSaga() {
  yield takeLatest('GET_PROFILE_INFO', getProfile);
  yield takeLatest('POST_NEW_PROFILE', postProfile);
  yield takeLatest('PUT_PROFILE', putProfile);
}

export default newProfileSaga;
