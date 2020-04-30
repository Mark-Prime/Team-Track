import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_PLAYER" actions
function* fetchTeam(action) {
  try {
    const response = yield axios.get(`/team/${action.payload}`);

    yield put({ type: 'SET_TEAMS', payload: response.data });
  } catch (error) {
    console.log('Players get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_PLAYERS" actions
function* fetchTeams(action) {
  try {
    const response = yield axios.get(`/team/all`);

    yield put({ type: 'SET_TEAMS', payload: response.data });
  } catch (error) {
    console.log('Players get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_PLAYERS" actions
function* saveTeamName(action){
  console.log('in saveTeamName');
  try {
    yield axios.put(`/team/name`, action.payload)
    
  } catch (error) {
    console.log('Error in put from /team/name', error);
  }
}

function* teamSaga() {
  yield takeLatest('FETCH_TEAM', fetchTeam);
  yield takeLatest('FETCH_TEAMS', fetchTeams);
  yield takeLatest('SAVE_TEAM_NAME', saveTeamName);
}

export default teamSaga;
