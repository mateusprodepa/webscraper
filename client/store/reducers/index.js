import { combineReducers } from 'redux';

const reducer = combineReducers(() => {});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT_RESET_STORE') {
    state = undefined;
  }

  return reducer(state, action);
}

export default rootReducer;