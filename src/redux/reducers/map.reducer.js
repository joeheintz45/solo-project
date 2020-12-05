const initialState = {
  lat: 0,
  lng: 0,
  radius: 5,
  updateNeeded: false,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CORD':
      return { ...action.payload };
    default:
      return state;
  }
};

export default mapReducer;
