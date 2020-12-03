import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMessage(action) {
  try {
    const response = yield axios.get(`api/message/${action.payload}`);
    console.log(response.data);
    yield put({
      type: 'SET_MESSAGE',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* postMessage(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    console.log(action.payload.id);
    yield axios.post(
      `/api/message/${action.payload.id}`,
      action.payload.message
    );
    yield put({
      type: 'GET_MESSAGES',
    });
  } catch (err) {
    console.log(err);
  }
}

function* deleteMessage(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.delete(`/api/message/delete/${action.payload}`);
    yield put({
      type: 'GET_MESSAGES',
    });
  } catch (err) {
    console.log(err);
  }
}

function* messageSaga() {
  yield takeLatest('GET_MESSAGES', getMessage);
  yield takeLatest('POST_MESSAGE', postMessage);
  yield takeLatest('DELETE_MESSAGE', deleteMessage);
}

export default messageSaga;
