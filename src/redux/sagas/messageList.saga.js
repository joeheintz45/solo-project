import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMessageList(action) {
  try {
    const response = yield axios.get(`api/message`);
    console.log(response.data);
    yield put({
      type: 'SET_MESSAGE_LIST',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* messageListSaga() {
  yield takeLatest('GET_MESSAGE_LIST', getMessageList);
}

export default messageListSaga;
