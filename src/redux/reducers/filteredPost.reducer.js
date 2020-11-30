const filteredReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FILTERED_POSTS':
      return action.payload;
    default:
      return state;
  }
};

export default filteredReducer;
