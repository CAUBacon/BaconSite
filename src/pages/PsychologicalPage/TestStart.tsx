// import React, { useEffect, useRef, useCallback } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import palette from '../../styles/palette';
// import Button from './button';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';
import React from 'react';
import FullHeightFade from '../../components/common/FullHeightFade';
import country from 'assets/country.svg';
import flex from 'assets/flex.svg';
import friends from 'assets/friends.svg';
import instagram from 'assets/instagram.svg';
import location from 'assets/location.svg';
import Button from '../../components/common/Button';
import YesNoDraw from './TestDraw';
import { count } from 'console';
import pizza from 'assets/pizza.png';



const SimpleImage = styled.img`
  height: 300px;
  object-fit: contain;
`;

const SimpleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  margin-bottom: 50px;
  padding: 0 30px;
`;

const Title = styled.div`
  text-align: center;
  font-family: 'Nanum Gothic';
  font-size: 30px;
  line-height: 50px;
  font-weight: 700;
  color: white;
  margin-top: 10px;
  margin-bottom: 20px;
  word-break: keep-all;
`

const RecommendTitle = styled.div`
  display: 100%;
  text-align: center;
  font-family: 'Nanum Gothic';
  font-size: 17px;
  font-weight: 900;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 30px;
  word-break: keep-all;

`

const NumberTitle = styled.div`
  display: 100%;
  text-align: center;
  font-family: 'Nanum Gothic';
  font-size: 17px;
  font-weight: 500;
  color: white;
  margin-top: 10px;
  margin-bottom: 60px;
  line-height: 30px;
  word-break: keep-all;

`


interface Props extends RouteComponentProps {}

class TestStart extends React.Component<Props> {

  componentDidMount() {
  }

  testStart() {
    window.location.href = "http://caufooding.com/test"
  }



  render() {
    return (
      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true} style={{ height: '100%' }}>
        <FullHeightFade>
          <Container color="red">
            <Header category="modal" headerColor="red" />
            <FullHeightFade>
                <SimpleImageContainer>
                    <Title>나를 음식으로 표현한다면?</Title>
                </SimpleImageContainer>
            <RecommendTitle>푸딩이 제안하는 음식 MBTI 알아보기</RecommendTitle>
            <NumberTitle>(12문항)</NumberTitle>
          </FullHeightFade>
            <Button theme="white" big onClick={this.testStart}>테스트 시작하기</Button>
          </Container>
        </FullHeightFade>
      </Animated>
    );
  }
}

export default TestStart;
