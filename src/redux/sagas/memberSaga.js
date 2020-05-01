import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_PLAYER" actions
function* fetchMembers(action) {
  try {
    const response = yield axios.get(`/member/${action.payload}`);

    yield put({ type: 'SET_MEMBERS', payload: response.data });
  } catch (error) {
    console.log('Players get request failed', error);
  }
}

function* fetchUserTeams(action) {
  try {
    const response = yield axios.get(`/member/user/${action.payload}`);

    yield put({ type: 'SET_TEAMS', payload: response.data });
  } catch (error) {
    console.log('Players get request failed', error);
  }
}

function* setMemberClass(action){
  console.log('in setMemberClass');
  try {
    yield axios.put(`/member/class`, action.payload)
    

  } catch (error) {
    console.log('Error in put from /member/class', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_MEMBERS', fetchMembers);
  yield takeLatest('FETCH_USER_TEAMS', fetchUserTeams);
  yield takeLatest('SET_MEMBER_CLASS', setMemberClass);
}

export default userSaga;
