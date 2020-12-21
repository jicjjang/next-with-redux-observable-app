import { combineEpics } from 'redux-observable'

import userEpics from 'store/user/epics';

export default combineEpics(userEpics);


