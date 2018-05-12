import { combineReducers } from 'redux';
import user from './userReducer';
import report from './reportReducer';


 const rootReducer = combineReducers({
	user,
	report
 });

 export default rootReducer;
