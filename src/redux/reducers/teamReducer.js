const teamReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return action.payload;
    case 'UNSET_TEAMS':
      return [];
    default:
      return state;
  }
};

export default teamReducer;
