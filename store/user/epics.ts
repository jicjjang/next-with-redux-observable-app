import { AxiosResponse } from 'axios'
import { from, of } from 'rxjs'
import { catchError, map, filter, switchMap } from 'rxjs/operators'
import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions';

import { UserActions, fetchUserAction } from 'store/user/actions';
import { RootState } from 'store/reducers';

export type UserEpic = Epic<UserActions, UserActions, RootState>;

interface UserService {
  userService: {
    fetchAction: (nextUserId: number) => Promise<AxiosResponse<any>>
  }
}

export const fetchUserEpic: UserEpic = (action$, state$, { userService: { fetchAction } }: UserService) =>
  action$.pipe( // pipe - 순서대로 operator를 받아와 처리한다
    filter(isActionOf(fetchUserAction.request)),
    switchMap((_action) => // mergeMap - https://boxfoxs.tistory.com/413 / fetchUsersEpic에서 호출이 여러번 됨
      from(fetchAction(state$.value.user.nextUserId)).pipe( // from - array, object, promise를 Obseravale로 감싼다. (promise는 순수 데이터로 벗겨서 반환해줌)
        map(({ data }) => // map - mergeMap으로 들어올 수 있는 여러 response를 처리함
          fetchUserAction.success({
            isServer: state$.value.user.isFetchedOnServer,
            response: data
          }),
        catchError((error) => // catchError - 에러는 하나만 나도 처리
          of( // of - 넣으면 넣은 값이 그대로 return 됨.
            fetchUserAction.failure({
              isServer: state$.value.user.isFetchedOnServer,
              error
            })
          )
        )
      )
    ))
  ); // 원래 rxjs는 마지막에 subscribe를 해야하지만, 그대로 리턴.

export default combineEpics(fetchUserEpic, fetchUserEpic);
