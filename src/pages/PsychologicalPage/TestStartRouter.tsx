import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import TestStart from './TestStart';


const TestStartRouterBlock = styled.div`
  height: 100%;
`;

function TestStartRouter({ match }: RouteComponentProps) {
  return (
    <TestStartRouterBlock>
      <Route exact path={`${match.path}`} component={TestStart} />
    </TestStartRouterBlock>
  );
}

export default withRouter(TestStartRouter);
