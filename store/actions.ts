import { UserActions } from 'store/user/actions';

export interface IAction<T = {}> {
  type: string,
  payload?: T
}

export type RootActions = UserActions;