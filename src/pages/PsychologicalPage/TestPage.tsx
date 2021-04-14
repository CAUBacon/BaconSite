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
import YesNoDraw from './TestDraw';
import { count } from 'console';

const base = [
  {
    id: 1,
    name: '나는 새로운 사람을 만나도 어색하지 않다.',
    img: country,
  },
  {
    id: 2,
    name: '나는 모르는 사람을 만나는 일이 피곤하다.',
    img: country,
  },
  {
    id: 3,
    name: '나는 말하면서 생각하고 대화도중 결심할 때가 있다.',
    img: flex,
  },
  {
    id: 4,
    name: '나는 의견을 말하기에 앞서 신중히 생각하는 편이다.',
    img: flex,
  },
  {
    id: 5,
    name: '일할 때 적막한 것보다는 어느 정도의 소리가 도움이 된다.',
    img: location,
  },
  {
    id: 6,
    name: '나는 소음이 있는 곳에서 일을 할 때 일하기가 힘들다.',
    img: location,
  },
  {
    id: 7,
    name: '영화를 설명할 때 줄거리를 길고 상세히 설명한다.',
    img: friends,
  },
  {
    id: 8,
    name: '감독의 의도 등에 대한 생각을 짧게 이야기한다.',
    img: friends,
  },
  {
    id: 9,
    name: '길을 설명할 때 상세히 어느 위치에 있는지 설명한다.',
    img: instagram,
  },
  {
    id: 10,
    name: '짧고 간단하게 주위 큰 건물 위주로 설명한다.',
    img: instagram,
  },
  {
    id: 11,
    name: '보고서에 대한 피드백을 받을 때 오탈자, 줄 간격 등 구체적이고 세밀한 부분을 먼저 체크한다.',
    img: country,
  },
  {
    id: 12,
    name: '전체적인 맥락을 먼저 체크하고 일관성이 없는 부분을 삭제한다.',
    img: country,
  },
  {
    id: 13,
    name: '시험에 떨어졌다는 친구에 말에 나는 "어떤 시험인데? 왜 떨어졌어?"라고 묻는다.',
    img: flex,
  },
  {
    id: 14,
    name: '"어떡해.. 힘들겠다. 나랑 맛있는 거 먹으러 가자! 다음엔 잘될거야!"라고 위로한다.',
    img: flex,
  },
  {
    id: 15,
    name: '요새 내가 힘들어보인다며 케이크를 사온 친구. "고마워"하고 속으로 내가 많이 힘들어보였나 되짚어본다.',
    img: location,
  },
  {
    id: 16,
    name: '"고마워 정말 감동아다ㅜㅜ"',
    img: location,
  },
  {
    id: 17,
    name: '"나 배탈난 것 같아"라고 말하는 친구, 나의 반응은? \n"헐, 뭐 먹고 배탈난거야?"',
    img: friends,
  },
  {
    id: 18,
    name: '"괜찮아? 음식도 못 먹고 많이 힘들겠다."',
    img: friends,
  },
  {
    id: 19,
    name: '나는 마지막에 임박했을 때 일을 처리하는 편이다.',
    img: instagram,
  },
  {
    id: 20,
    name: '나는 계획에 의해 일을 처리하는 편이다.',
    img: instagram,
  },
  {
    id: 21,
    name: '나는 즐거운 분위기에서 일이 잘된다.',
    img: country,
  },
  {
    id: 22,
    name: '나는 조직적인 분위기에서 일이 잘된다.',
    img: country,
  },
  {
    id: 23,
    name: '나는 날 잡아서 정리하는 편이다.',
    img: flex,
  },
  {
    id: 24,
    name: '나는 정리정돈을 자주하는 편이다.',
    img: flex,
  },
];


const ActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${palette.mainRed};
  height: 80px;
`;

let beClicked = false;
let selected_name = 'false';
let resultDataSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//spicy,  10000이상,  front(+hs_station, front_far),  individual, atmosphere
//!spicy, 10000이하,  back,                           !individual, !atmosphere

// const moveHref = () => {
//   beClicked = true;
//   selected_name = 'true';
// };

interface Props extends RouteComponentProps {}

interface DataInterface {
  option: string[];
}

let data = ['', '', '', '', '', '', '', '', '', '', '', ''];

interface State {
  views: {
    id: number;
    name: string;
    img: string;
  }[];
  result: string[];
  round: number;
  sequence: number;
  end: boolean;
}

class TestPage extends React.Component<Props, State> {
  state: State = {
    views: [base[0], base[1]],
    result: [],
    round: 24,
    sequence: 0,
    end: false,
  };

  componentDidMount() {
    let imageList = [country, flex, instagram, location, friends];
    imageList.forEach((image) => {
      console.log('load');
      new Image().src = image;
    });
  }

  handleReset() {
    this.setState({
      views: [base[0], base[1]],
      result: [],
      round: 24,
      sequence: 0,
      end: false,
    });
  }

  count = 0;

  async handleChange(id: number) {
    this.count++;
    const resultdata = this.state.result.slice();
    resultdata.push(base[id - 1].name);
    if (id % 2 === 1) {
        resultDataSet[this.count - 1] = resultDataSet[this.count - 1] + 1;
    } else {
        resultDataSet[this.count - 1] = resultDataSet[this.count - 1] - 1;
    }

    this.setState((prevState) => ({
      sequence: prevState.sequence + 1, // sequence 1씩 증
      views: [base[2 * this.count], base[2 * this.count + 1]],
    }));

    if (this.count === 12) {
        var resultValue = 0
        for(var i = 0; i < 3; i++){
            resultValue = resultValue + resultDataSet[i]
        }
        if(resultValue > 0){
            data[0] = 'e'
        } else {
            data[0] = 'i'
        }

        resultValue = 0
        for(var i = 3; i < 6; i++){
            resultValue = resultValue + resultDataSet[i]
        }
        if(resultValue > 0){
            data[1] = 's'
        } else {
            data[1] = 'n'
        }

        resultValue = 0
        for(var i = 6; i < 9; i++){
            resultValue = resultValue + resultDataSet[i]
        }
        if(resultValue > 0){
            data[2] = 't'
        } else {
            data[2] = 'f'
        }

        resultValue = 0
        for(var i = 9; i < 12; i++){
            resultValue = resultValue + resultDataSet[i]
        }
        if(resultValue > 0){
            data[3] = 'p'
        } else {
            data[3] = 'j'
        }

      this.props.history.push({
        pathname: '/testresult',
        search: '?ei=' + data[0] + '&sn=' + data[1] + '&tf=' + data[2] + '&pj=' + data[3],
      });
    }
  }

  moveHref = (data: DataInterface[]) => {
    beClicked = true;
    selected_name = 'true';
    this.props.history.push({
      pathname: '/testresult',
      search:
        '?ei=' +
        data[0].option.join(',') +
        '&sn=' +
        data[1].option.join(',') +
        '&tf=' +
        data[2].option.join(',') +
        '&pj=' +
        data[3].option.join(','),
    });
  };

  render() {
    const { views } = this.state;
    return (
      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true} style={{ height: '100%' }}>
        <FullHeightFade>
          <Container color="red">
            <Header category="modal" headerColor="red" />
            {base.map((view, index) => (
              <YesNoDraw
                show={index === 2 * this.count || index === 2 * this.count + 1}
                key={index}
                id={view.id}
                name={view.name}
                img={view.img}
                onChange={(id) => this.handleChange(id)}
              />
            ))}
            {/* {views.map((view, index) => {
              return <YesNoDraw key={index} id={view.id} name={view.name} img={view.img} onChange={(id) => this.handleChange(id)} />;
            })} */}
            <ActionContainer></ActionContainer>
          </Container>
        </FullHeightFade>
      </Animated>
    );
  }
}

export default TestPage;
