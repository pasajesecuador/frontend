import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import errorsReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import commonReducer from './commonReducer';

export default combineReducers({
  drawer: drawerReducer,
  errors: errorsReducer,
  auth: authReducer,
  loading: loadingReducer,
  profile: profileReducer,
  common: commonReducer,
});