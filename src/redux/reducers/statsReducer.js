const statsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_STATS':
      return action.payload[0];
    case 'UNSET_STATS':
      return {};
    default:
      return state;
  }
};

export default statsReducer;
