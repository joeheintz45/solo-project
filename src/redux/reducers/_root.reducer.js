import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import type from './type.reducer';
import post from './collabPost.reducer';
import filter from './filteredPost.reducer';
import profilePrimary from './profile.reducer';
import projects from './project.reducer';
import secondId from './secondaryProfileId.reducer';
import profileSecondary from './secondaryProfile.reducer';
import projectsSecondary from './secondaryProject.reducer';
import map from './map.reducer';
import circle from './circle.reducer';
import message from './message.reducer';
import messageList from './messageList.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  type,
  post,
  filter,
  profilePrimary,
  projects,
  secondId,
  profileSecondary,
  projectsSecondary,
  map,
  circle,
  message,
  messageList,
});

export default rootReducer;
