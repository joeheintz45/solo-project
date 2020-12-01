import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSecondProject(action) {
  try {
    const response = yield axios.get(`/api/project/${action.payload}`);
    console.log(response.data);
    yield put({
      type: 'SET_PROJECT_SECONDARY',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* secondaryProjectSaga() {
  yield takeLatest('GET_SECONDARY_PROJECTS', getSecondProject);
}

export default secondaryProjectSaga;
