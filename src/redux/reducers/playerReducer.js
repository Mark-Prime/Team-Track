const playerReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLAYERS':
      return action.payload;
    case 'UNSET_PLAYERS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default playerReducer;
