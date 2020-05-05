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

export default memberReducer;
