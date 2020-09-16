import { combineReducers } from 'redux';
import detail from './detail';
import writeReview from './writeReview';
import kakao from './kakao';
import user from './user';
import shops from './shops';
import auth from './auth';
import myPage from './myPage';
import report from './report';

const rootReducer = combineReducers({
  detail,
  writeReview,
  kakao,
  user,
  shops,
  auth,
  myPage,
  report,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
