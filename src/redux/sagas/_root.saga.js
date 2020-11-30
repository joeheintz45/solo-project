import { all } from 'redux-saga/effects';
import postSaga from './collabPost.saga';
import filteredSaga from './filteredPosts.saga';
import loginSaga from './login.saga';
import newProfileSaga from './newProfile.saga';
import projectSaga from './project.saga';
import registrationSaga from './registration.saga';
import typeSaga from './type.saga';
import userSaga from './user.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    typeSaga(),
    newProfileSaga(),
    postSaga(),
    filteredSaga(),
    projectSaga(),
  ]);
}
