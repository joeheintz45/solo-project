const profileSecondaryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_SECONDARY':
      return action.payload;
    default:
      return state;
  }
};

export default profileSecondaryReducer;
