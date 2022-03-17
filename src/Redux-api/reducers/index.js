import {combineReducers} from 'redux';
import HomeReducer from './home';
import AuthReducer from './auth';
import LoginReducer from './loginReducer'

const rootReducer = combineReducers({
    LoginReducer,
    HomeReducer,
    AuthReducer
})

export default rootReducer;