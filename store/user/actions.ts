import { ActionType, createAsyncAction } from "typesafe-actions";

interface IsServer {
  isServer: boolean;
}

export interface Response extends IsServer {
  response: any
}

export interface Error extends IsServer {
  error: any
}

export const fetchUserAction = createAsyncAction(
  '@user/FETCH_USER',
  '@user/FETCH_USER_SUCCESS',
  '@user/FETCH_USER_FAILURE'
)<IsServer, Response, Error>();

const actions = {
  fetchUserAction
}

export type UserActions = ActionType<typeof actions>;