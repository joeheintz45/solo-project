import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getProject(action) {
  try {
    const response = yield axios.get('/api/project');
    console.log(response.data);
    yield put({
      type: 'SET_PROJECTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* postProject(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/project', action.payload);
    yield put({
      type: 'GET_PROJECTS',
    });
  } catch (err) {
    console.log(err);
  }
}

function* deleteProject(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.delete(`/api/project/delete/${action.payload}`);
    yield put({
      type: 'GET_PROJECTS',
    });
  } catch (err) {
    console.log(err);
  }
}

function* projectSaga() {
  yield takeLatest('GET_PROJECTS', getProject);
  yield takeLatest('POST_NEW_PROJECT', postProject);
  yield takeLatest('DELETE_PROJECT', deleteProject);
}

export default projectSaga;
