# next-with-redux-observable-app

- rxjs가 기본
- reducer / actions / epics 가 기본 개념

## 설명

### epics

- 기본적으로 epics가 actions가 실행되는 동작이라 보면 됨
- combineEpics로 묶인 epic들의 type(ofType)으로 tracking함

### rxjs

사용된 부분 (store/epics.ts)을 예제로 설명합니다.

- [.pipe](https://feel5ny.github.io/2018/11/18/Async_04/#2-2-RxJS-%EC%B2%AB%EB%B2%88%EC%A7%B8-%EC%98%88%EC%A0%9C-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)
  - 순서대로 operator를 받아와 처리합니다.
  - 아래 두 코드는 동일합니다.

```javascript
// 도트체이닝
ajax$
  .switchMap(data=>...)
  .filter(user => ...)
  .map(user => ...)
```

```javascript
// pipe 오프레이터
ajax$
  .pipe(
    switchMap(data => ...),
    filter(user => ...),
    map(user => ...)
  )
```

- .ofType
  - action 타입을 잡아냅니다.
  - 기본적인 rxjs에는 없음. redux-observable에서 만든 Observable객체

```javascript
ofType(USER_TYPES.FETCH_USER); // => ACTION_TYPE이 USER_TYPES.FETCH_USER 인 action을 잡아냄!
```

- [.mergeMap](https://boxfoxs.tistory.com/413)
  - 기본적으로 redux는 동일한 ACTION_TYPE을 여러개 지정할 수 있습니다.
  - dot 연산자에 들어온 values와 mergeMap의 매개변수와의 모든 경우의 수가 생겨난다고 생각하면 된다.

```javascript
.pipe (
    ofType(USER_TYPES.FETCH_USER),
    mergeMap((action) => // USER_TYPES.FETCH_USER 액션이 여러번 들어와도 처리가 가능하다.
        from(axios.get(`https://jsonplaceholder.typicode.com/users/${state$.value.nextUserId}`)).pipe(
            map((response) => // 액션이 여러 번 호출된 뒤 들어오는 response들을 순차적으로 모두 처리해줌
                actions.fetchUserSuccess(response.data, action.payload!.isServer)
            ),
            catchError((error) => // catchError - 에러는 하나만 나도 처리
                of( // of - 넣으면 넣은 값이 그대로 return 됨.
                    actions.fetchUserFailure(
                        error.response,
                        action.payload!.isServer
                    )
                )
            )
        )
    )
)
```

- [.from](https://rxjs-dev.firebaseapp.com/api/index/function/from)
  - array, object, promise 등을 Observable로 만든다.
  - promise는 asymc-await 후 데이터만 return 해준다. (물론 Observable)

```javascript
// axios 호출 동작을 Observable 한 객체로 만듬
from(axios.get(`https://jsonplaceholder.typicode.com/users/${state$.value.nextUserId}`)).pipe(
    ...
)
```

- .map
  - 우리가 아는 map과 동일
  - Observalbe 객체로 묶인 map이다

```javascript
map((response) => // 액션이 여러 번 호출된 뒤 들어오는 response들을 순차적으로 모두 처리해줌
    actions.fetchUserSuccess(response.data, action.payload!.isServer)
),
```

- .catchError
  - 에러를 잡음

```javascript
catchError((error) => // 에러는 한번만 나도 처리. 해당 처리로 USER_TYPES.FETCH_USER_FAILURE 가 호출되며 종료된다.
```

- .of
  - 인수를 관찰 가능한 시퀀스로 변환합니다.

```javascript
of( // 넣으면 넣은 값이 그대로 return 됨.
    actions.fetchUserFailure(
        error.response,
        action.payload!.isServer
    )
)
```
