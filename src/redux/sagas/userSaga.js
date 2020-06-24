import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_PLAYER" actions
function* fetchPlayer(action) {
  try {
    const response = yield axios.get(`/player/${action.payload}`);

    yield put({ type: 'SET_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('Players get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_PLAYERS" actions
function* fetchPlayers(action) {
  try {
    const response = yield axios.get(`/player/all`);

    yield put({ type: 'SET_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('Players get request failed', error);
  }
}

function* searchPlayers(action) {
  try {
    const response = yield axios.get(`/search/player/${action.payload}`);

    yield put({ type: "SET_PLAYERS", payload: response.data });
  } catch (error) {
    console.log("Players get request failed", error);
  }
}

function* refreshUser(){
  try {
    yield axios.get(`/user/refresh`)
    
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('Error in get from /user/refresh', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('REFRESH_USER', refreshUser);
  yield takeLatest('FETCH_PLAYER', fetchPlayer);
  yield takeLatest('FETCH_PLAYERS', fetchPlayers);
  yield takeLatest('SEARCH_PLAYERS', searchPlayers);
}

export default userSaga;
