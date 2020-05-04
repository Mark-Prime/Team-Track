import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadLog(action){
    console.log('in uploadLog');
    try {
        let response = yield axios.post(`/log/`, action.payload)

        console.log('response', response);        
    } catch (error) {
        console.log('Error in post from /logs/', error);
    }
}


function* statsSaga() {
    yield takeLatest('UPLOAD_LOG', uploadLog);
}

export default statsSaga;
