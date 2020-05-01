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

// user will be on the redux state at:
// state.user
export default statsReducer;
