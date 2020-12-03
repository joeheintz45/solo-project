const messageListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MESSAGE_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default messageListReducer;
