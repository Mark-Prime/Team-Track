import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadLog(action){
    console.log('in uploadLog');
    try {
        let response = yield axios.post(`/log/`, action.payload)

        if (response.status === 200) {
            action.payload.closeModal()
        }
    } catch (error) {
        console.log('Error in post from /logs/', error);
    }
}

function* fetchAllTeamLogs(action){
    console.log('in fetchTeamLogs');
    try {
        let response = yield axios.get(`/log/team/${action.payload}`)
        
        yield put({ type: 'SET_LOGS', payload: response.data });
    } catch (error) {
        console.log(`Error in get from /log/${action.payload}`, error);
    }
}

function* fetchPlayerLogs(action){
    console.log('in fetchPlayerLogs');
    try {
        let response = yield axios.get(`/log/player/${action.payload}`)
        
        yield put({ type: 'SET_LOGS', payload: response.data });
    } catch (error) {
        console.log(`Error in get from /player/${action.payload}`, error);
    }
}



function* statsSaga() {
    yield takeLatest('UPLOAD_LOG', uploadLog);
    yield takeLatest('FETCH_TEAM_LOGS', fetchAllTeamLogs);
    yield takeLatest('FETCH_PLAYER_LOGS', fetchPlayerLogs);
}

export default statsSaga;
