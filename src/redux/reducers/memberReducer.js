const memberReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEMBERS':
      return action.payload;
    case 'UNSET_MEMBERS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default memberReducer;
