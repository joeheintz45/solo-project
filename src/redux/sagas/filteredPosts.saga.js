import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getFilteredPosts(action) {
  try {
    const response = yield axios.get(`/api/collab/${action.payload.type_id}`);
    console.log(response.data);
    yield put({
      type: 'SET_FILTERED_POSTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* filteredSaga() {
  yield takeLatest('GET_FILTER_POSTS', getFilteredPosts);
}

export default filteredSaga;
