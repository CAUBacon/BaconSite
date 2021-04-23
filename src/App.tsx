import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Container from './components/layout/Container';
import Header from './components/layout/Header';
import Title from 'lib/meta';
import SimpleLoader from 'components/common/SimpleLoader';

const ResultPage = React.lazy(() => import(/* webpackChunkName: "result", webpackPrefetch: true */ './pages/ResultPage/ResultPage'));
const TestResultPage = React.lazy(() => import(/* webpackChunkName: "result", webpackPrefetch: true */ './pages/ResultPage/TestResultPage'));
const DetailPageRouter = React.lazy(() => import(/* webpackChunkName: "detail", webpackPrefetch: true */ './pages/DetailPage/DetailPageRouter'));
const AdminRouter = React.lazy(() => import(/* webpackChunkName: "admin" */ './pages/AdminPage/AdminRouter'));
const RouletteRouter = React.lazy(() => import(/* webpackChunkName: "roulette", webpackPrefetch: true */ './pages/RoulettePage/RoulettePage'));
const RouletteListRouter = React.lazy(() => import(/* webpackChunkName: "rouletteList", webpackPrefetch: true */ './pages/RoulettePage/RouletteList'));
const LoginPageRouter = React.lazy(() => import(/* webpackChunkName: "login", webpackPrefetch: true */ './pages/AuthPage/LoginPageRouter'));
const YesNoPageRouter = React.lazy(() => import(/* webpackChunkName: "yesno", webpackPrefetch: true */ './pages/YesNoPage/YesNoPageRouter'));
const FilterPageRouter = React.lazy(() => import(/* webpackChunkName: "filter", webpackPrefetch: true */ './pages/FilterPage/FilterPageRouter'));
const TestPageRouter = React.lazy(() => import(/* webpackChunkName: "filter", webpackPrefetch: true */ './pages/PsychologicalPage/TestPageRouter'));
const TestStartRouter = React.lazy(() => import(/* webpackChunkName: "filter", webpackPrefetch: true */ './pages/PsychologicalPage/TestStartRouter'));
const MyPageRouter = React.lazy(() => import(/* webpackChunkName: "myPage", webpackPrefetch: true */ './pages/MyPage/MyPage'));
const Page404 = React.lazy(() => import(/* webpackChunkName: "404", webpackPrefetch: true */ './pages/Page404'));
const SearchPage = React.lazy(() => import(/* webpackChunkName: "SearchPage", webpackPrefetch: true */ './pages/SearchPage/SearchPage'));

function App() {
  return (
    <Suspense
      fallback={
        <Container color="white">
          <Header category="modal" headerColor="white" />
          {/* <Loader /> */}
          <SimpleLoader />
        </Container>
      }
    >
      <Title title="뭐 먹을지 못 정할 땐, 푸딩" />
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={DetailPageRouter} path="/shop" />
        <Route component={LoginPageRouter} path="/auth" />
        <Route component={YesNoPageRouter} path="/yesno" />
        <Route component={ResultPage} path="/result" />
        <Route component={TestResultPage} path="/testresult" />
        <Route component={AdminRouter} path="/admin" />
        <Route component={RouletteRouter} path="/roulette" />
        <Route component={RouletteListRouter} path="/rouletteList" />
        <Route component={FilterPageRouter} path="/filter" />
        <Route component={TestPageRouter} path="/test" />
        <Route component={TestStartRouter} path="/teststart" />
        <Route component={MyPageRouter} path="/myPage" />
        <Route component={SearchPage} path="/search" />
        <Route component={Page404} />
      </Switch>
    </Suspense>
  );
}

// 라우팅 할 때 App 타이틀을 매번 로딩해주기 위해서
export default withRouter(App);
