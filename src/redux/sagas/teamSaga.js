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
function* fetchTeams() {
  try {
    const response = yield axios.get(`/team/all`);

    yield put({ type: 'SET_TEAMS', payload: response.data });
  } catch (error) {
    console.log('Players get request failed', error);
  }
}

function* saveTeamName(action){
  console.log('in saveTeamName');
  try {
    yield axios.put(`/team/name`, action.payload)
  } catch (error) {
    console.log('Error in put from /team/name', error);
  }
}

function* saveTeamTag(action) {
  console.log('in saveTeamTag');
  try {
    yield axios.put(`/team/tag`, action.payload)
  } catch (error) {
    console.log('Error in put from /team/tag', error);
  }
}

function* newTeam(action){
  console.log('in newTeam');
  try {
    let response = yield axios.post(`/team/`, action.payload)

    window.location = `#/team/${response.data.team_id}`;
  } catch (error) {
    console.log('Error in post from /team/new', error);
  }
}

function* deactivateTeam(action){
  console.log('in deactivateTeam');
  try {
    yield axios.put(`/team/deactivate/${action.payload}`)
    
    window.location.reload()
  } catch (error) {
    console.log('Error in put from /team/deactivate', error);
  }
}

function* teamSaga() {
  yield takeLatest('FETCH_TEAM', fetchTeam);
  yield takeLatest('FETCH_TEAMS', fetchTeams);
  yield takeLatest('SAVE_TEAM_NAME', saveTeamName);
  yield takeLatest('SAVE_TEAM_TAG', saveTeamTag);
  yield takeLatest('NEW_TEAM', newTeam);
  yield takeLatest('DEACTIVATE_TEAM', deactivateTeam);
}

export default teamSaga;
