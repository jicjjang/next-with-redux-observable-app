import { createReducer } from "typesafe-actions";
import produce from 'immer';

import { fetchUserAction, UserActions } from 'store/user/actions';

export interface UserState {
  nextUserId: number,
  character: {
    name?: string,
    id?: string,
    username?: string,
    email?: string,
    phone?: string,
    website?: string
  },
  isFetchedOnServer: boolean,
  error: any,
}

const initState: UserState = {
  nextUserId: 1,
  character: {},
  isFetchedOnServer: false,
  error: null,
}

const userReducer = createReducer<UserState, UserActions>(initState)
  .handleAction(fetchUserAction.success, (state, action) => produce(state, draft => {
    draft.character = action.payload.response;
    draft.nextUserId = state.nextUserId + 1;
  }))
  .handleAction(fetchUserAction.failure, (state, action) => produce(state, draft => {
    draft.isFetchedOnServer = action.payload.isServer;
    draft.error = action.payload.error;
  }));

export default userReducer;