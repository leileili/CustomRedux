import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import CommonReducer from '../common/CommonReducer'

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  CommonReducer:CommonReducer
  // your reducer here
});
