import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import axios from 'axios';

import { RootActions } from 'store/actions';
import rootReducer, { RootState } from 'store/reducers';
import rootEpic from 'store/epics';

const makeStore: MakeStore<RootState, RootActions> = () => {
  const epicMiddleware = createEpicMiddleware<RootActions, RootActions, RootState>({
    dependencies: {
      userService: {
        async fetchAction(nextUserId: number) {
          try {
            return await axios.get(`https://jsonplaceholder.typicode.com/users/${nextUserId}`)
          } catch(e) {
            console.error(e);
            throw e;
          }
        }
      }
    }
  });
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware, createLogger({ collapsed: true })));

  epicMiddleware.run(rootEpic);

  return store;
}


const wrapper = createWrapper(makeStore, {
  debug: true
});

export default wrapper;