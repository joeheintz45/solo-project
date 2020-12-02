import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getCircle(action) {
  try {
    const response = yield axios.get('/api/map');
    console.log(response.data);
    yield put({
      type: 'SET_CIRCLE',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* postCircle(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/map', action.payload);
    yield put({
      type: 'GET_CIRCLE',
    });
  } catch (err) {
    console.log(err);
  }
}

function* circleSaga() {
  yield takeLatest('GET_CIRCLE', getCircle);
  yield takeLatest('POST_CIRCLE', postCircle);
}

export default circleSaga;
