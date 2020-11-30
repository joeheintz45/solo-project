import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTypes(action) {
  try {
    const response = yield axios.get('/api/type');
    console.log(response.data);
    yield put({
      type: 'SET_TYPE',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* typeSaga() {
  yield takeLatest('GET_TYPES', getTypes);
}

export default typeSaga;
