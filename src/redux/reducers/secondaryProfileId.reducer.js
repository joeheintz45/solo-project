const projectReducer = (state = { id: '' }, action) => {
  switch (action.type) {
    case 'SET_SECONDARY_ID':
      return action.payload;
    default:
      return state;
  }
};

export default projectReducer;
