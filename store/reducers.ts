import { combineReducers } from "redux";
import { StateType } from 'typesafe-actions';
import { HYDRATE } from "next-redux-wrapper";

import userReducer from 'store/user/reducers';

const combinedReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;