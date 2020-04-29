import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_PLAYER" actions
function* fetchTeam(action) {
  try {
    const response = yield axios.get(`/player/${action.payload}`);

    yield put({ type: 'SET_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('Players get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_PLAYERS" actions
function* fetchTeams(action) {
  try {
    const response = yield axios.get(`/player/all`);

    yield put({ type: 'SET_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('Players get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_TEAM', fetchTeam);
  yield takeLatest('FETCH_TEAMS', fetchTeams);
}

export default userSaga;
