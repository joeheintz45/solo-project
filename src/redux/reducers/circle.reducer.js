const circleReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CIRCLE':
      return action.payload;
    default:
      return state;
  }
};

export default circleReducer;
