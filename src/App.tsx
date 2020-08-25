import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Container from './components/layout/Container';
import Header from './components/layout/Header';
import Loader from './components/common/Loader';
import DetailPageRouter from './pages/DetailPage/DetailPageRouter';
import { Helmet } from 'react-helmet-async';

const ResultPage = React.lazy(() => import(/* webpackChunkName: "result", webpackPrefetch: true */ './pages/ResultPage/ResultPage'));
const AdminRouter = React.lazy(() => import('./pages/AdminPage/AdminRouter'));
const RouletteRouter = React.lazy(() => import(/* webpackChunkName: "roulette", webpackPrefetch: true */ './pages/RoulettePage/RoulettePageRouter'));
const RouletteListRouter = React.lazy(() => import(/* webpackChunkName: "rouletteList", webpackPrefetch: true */ './pages/RoulettePage/RouletteListRouter'));
const LoginPageRouter = React.lazy(() => import(/* webpackChunkName: "login", webpackPrefetch: true */ './pages/AuthPage/LoginPageRouter'));
const YesNoPageRouter = React.lazy(() => import(/* webpackChunkName: "yesno", webpackPrefetch: true */ './pages/YesNoPage/YesNoPageRouter'));
const FilterPageRouter = React.lazy(() => import(/* webpackChunkName: "filter", webpackPrefetch: true */ './pages/FilterPage/FilterPageRouter'));
const MyPageRouter = React.lazy(() => import(/* webpackChunkName: "myPage", webpackPrefetch: true */ './pages/MyPage/MyPage'));

function App() {
  return (
    <>
      <Helmet>
        <title>뭐 먹을지 못 정할 땐, 푸딩</title>
      </Helmet>
      <Suspense
        fallback={
          <Container color="white">
            <Header category="modal" headerColor="white" />
            <Loader />
          </Container>
        }
      >
        <Switch>
          <Route component={HomePage} path="/" exact />
          <Route component={DetailPageRouter} path="/shop" />
          <Route component={LoginPageRouter} path="/auth" />
          <Route component={YesNoPageRouter} path="/yesno" />
          <Route component={ResultPage} path="/result" />
          <Route component={AdminRouter} path="/admin" />
          <Route component={RouletteRouter} path="/roulette" />
          <Route component={RouletteListRouter} path="/rouletteList" />
          <Route component={FilterPageRouter} path="/filter" />
          <Route component={MyPageRouter} path="/myPage" />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
