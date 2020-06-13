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
  try {
    yield axios.put(`/member/class`, action.payload)
    
    yield put({ type: 'FETCH_TEAM', payload: action.payload.target })
    yield put({ type: 'FETCH_MEMBERS', payload: action.payload.target })
  } catch (error) {
    console.log('Error in put from /member/class', error);
  }
}

function* promoteMember(action){
  console.log('in promoteMember');
  try {
    yield axios.put(`/member/promote`, action.payload)

    yield put({ type: 'FETCH_TEAM', payload: action.payload.team })
    yield put({ type: 'FETCH_MEMBERS', payload: action.payload.team })
    
  } catch (error) {
    console.log('Error in put from /member/promote', error);
  }
}

function* removeMember(action){
  console.log('in removeMember');
  try {
    console.log('payload:', action.payload.id, action.payload.team);
    
    yield axios.delete(`/member`, { data: action.payload } )

    yield put({ type: 'FETCH_TEAM', payload: action.payload.team })
    yield put({ type: 'FETCH_MEMBERS', payload: action.payload.team })
    
  } catch (error) {
    console.log('Error in delete from /member', error);
  }
}

function* setMemberMain(action){
  console.log('in setMemberMain');
  try {
    yield axios.put(`/member/main`, action.payload)
    
    yield put({ type: 'FETCH_TEAM', payload: action.payload.target })
    yield put({ type: 'FETCH_MEMBERS', payload: action.payload.target })
  } catch (error) {
    console.log('Error in put from /member/main', error);
  }
}

function* joinTeam(action){
  console.log('in joinTeam');
  try {
    yield axios.post(`/member`, action.payload)

    yield put({ type: 'FETCH_TEAM', payload: action.payload.team })
    yield put({ type: 'FETCH_MEMBERS', payload: action.payload.team })
    
  } catch (error) {
    console.log('Error in post from /member/', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_MEMBERS', fetchMembers);
  yield takeLatest('FETCH_USER_TEAMS', fetchUserTeams);
  yield takeLatest('SET_MEMBER_CLASS', setMemberClass);
  yield takeLatest('SET_MEMBER_MAIN', setMemberMain);
  yield takeLatest('PROMOTE_TO_LEADER', promoteMember);
  yield takeLatest('REMOVE_MEMBER', removeMember);
  yield takeLatest('JOIN_TEAM', joinTeam);
}

export default userSaga;
