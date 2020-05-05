const logReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOGS':
      return action.payload;
    case 'UNSET_LOGS':
      return [];
    default:
      return state;
  }
};

export default logReducer;
