import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import TestPage from './TestPage';
import TestStart from './TestStart';


const TestPageRouterBlock = styled.div`
  height: 100%;
`;

function TestPageRouter({ match }: RouteComponentProps) {
  return (
    <TestPageRouterBlock>
      <Route exact path={`${match.path}`} component={TestPage} />
    </TestPageRouterBlock>
  );
}

export default withRouter(TestPageRouter);
