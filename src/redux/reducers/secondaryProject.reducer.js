const projectReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECT_SECONDARY':
      return action.payload;
    default:
      return state;
  }
};

export default projectReducer;
