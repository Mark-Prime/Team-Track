import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import teamSaga from './teamSaga';
import memberSaga from './memberSaga';
import statsSaga from './statsSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    userSaga(), 
    teamSaga(),
    memberSaga(),
    statsSaga(),
  ]);
}
