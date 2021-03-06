import { combineReducers } from 'redux';
import user from './userReducer';
import player from './playerReducer';
import team from './teamReducer';
import member from './memberReducer';
import stats from './statsReducer';
import log from './logReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  user, // will have an id and username if someone is logged in
  player,
  team,
  member,
  stats,
  log,
});

export default rootReducer;
