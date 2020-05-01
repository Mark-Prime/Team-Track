import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPlayerStats(action){
  console.log('in fetchPlayerStats');
  try {
    let response = yield axios.get(`/stats/${action.payload}`)

    yield put({ type: 'SET_STATS', payload: response.data });
    console.log(response)
  } catch (error) {
    console.log(`Error in get from /stats/${action.payload}`, error);
  }
}


function* statsSaga() {
  yield takeLatest('FETCH_PLAYER_STATS', fetchPlayerStats);
}

export default statsSaga;
