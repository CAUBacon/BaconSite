// import React, { useEffect, useRef, useCallback } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import palette from '../../styles/palette';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import React from 'react';
import { Wheel } from 'react-custom-roulette';
import Button from '../../components/common/Button';
// import Roulette from 'react-native-casino-roulette';

// const Roulette = require('react-native-casino-roulette');
// //Roulette numbers
// const numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
// const options = numbers.map((o) => ({ index: o }));

const data = [
  { option: '맥도날드', style: { backgroundColor: '#dddddd', textColor: '#5d5d5d' }, font: 'Nanum Gothic' },
  { option: '더마니', style: { backgroundColor: 'white', textColor: '#5d5d5d' }, font: 'Nanum Gothic' },
];

const ResultComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 17px;
  font-weight: 900;
  text-align: center;
  margin-top: 7px;
  margin-bottom: 0px;
  color: white;
  padding: 5px;
`;

const EmptySpace = styled.h1`
  text-align: center;
  margin-top: 7px;
  margin-bottom: 0px;
  color: white;
  padding: 25px;
`;

function RoulettePage() {
  let beClicked = false;
  let selected_name = 'false';

  const moveHref = () => {
    beClicked = true;
    selected_name = 'true';
  };

  return (
    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
      <Fade>
        <Container color="red">
          <Header category="modal" headerColor="red" />
          <Fade>
            <Bounce>
              <EmptySpace></EmptySpace>
              <ResultComment>START 버튼을 눌러</ResultComment>
              <ResultComment>룰렛을 돌리세요!</ResultComment>
              <EmptySpace></EmptySpace>
              <Wheel
                mustStartSpinning={!beClicked}
                prizeNumber={1}
                data={data}
                backgroundColors={['#ffffff']}
                textColors={['#000000']}
                outerBorderWidth={3}
                innerBorderWidth={0}
                radiusLineWidth={0}
                fontSize={25}
                onStopSpinning={() => null}
              />
              <Button theme="white" big onClick={moveHref}>
                start
              </Button>
            </Bounce>
          </Fade>
        </Container>
      </Fade>
    </Animated>
  );
}

export default RoulettePage;

{
  /* <canvas width={50} height={50} color={'black'} background-color={'black'}>
start누르세요
</canvas> */
}