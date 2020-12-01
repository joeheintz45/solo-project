import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSecondProfile(action) {
  try {
    const response = yield axios.get(`/api/profile/${action.payload}`);
    console.log(response.data);
    yield put({
      type: 'SET_PROFILE_SECONDARY',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* secondaryProfileSaga() {
  yield takeLatest('GET_SECONDARY_PROFILE', getSecondProfile);
}

export default secondaryProfileSaga;
