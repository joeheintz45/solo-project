const profileReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_PRIMARY':
      return action.payload;
    default:
      return state;
  }
};

export default profileReducer;
