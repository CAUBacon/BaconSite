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
    name: '새로운 사람을 만나도 어색하지 않다.',
    img: country,
    txt: "#01. 친구들과의 술자리를 나갔더니 처음 보는 사람이 있다.",
    txt2: "이때 나는 어떨까?"
  },
  {
    id: 2,
    name: '모르는 사람을 만나 피곤하다.',
    img: country,
    txt: "",
    txt2: ""
  },
  {
    id: 3,
    name: "'이 의견은 괜히 말한 거 같은데... 너무 많이 말했나.'",
    img: flex,
    txt: '#02. 밥을 먹고 친구들과 카페에서 과제 회의를 했다. 어쩐지 회의가 끝나고 무언가를 후회 중인 나.',
    txt2: "어떤 걸 후회하고 있을까?"
  },
  {
    id: 4,
    name: "'이 의견도 말할걸... 너무 신중했다.'",
    img: flex,
    txt: "",
    txt2: ""
  },
  {
    id: 5,
    name: '어느 정도의 소리가 도움이 되므로 자리를 찾아서 앉는다.',
    img: location,
    txt: "#03. 회의가 끝나고 공부하러 카페에 갔는데 음악이 흘러나오고 몇몇 테이블에서 사람들이 대화를 나누고 있다.",
    txt2: "이때 나는 어떻게 할까?"
  },
  {
    id: 6,
    name: '소음이 있는 곳에서 집중하기 힘드니 다른 곳으로 간다.',
    img: location,
    txt: "",
    txt2: ""
  },
  {
    id: 7,
    name: '"소스 맛이..." 맛에 대해 상세히 설명해 준다.',
    img: friends,
    txt: "#04. 친구가 어제 내가 먹은 떡볶이 새로 나온 맛이 어떤지 물어본다.",
    txt2: "뭐라고 대답할까?"
  },
  {
    id: 8,
    name: '"맛있었어!" 짧게 감상에 대해 말해준다.',
    img: friends,
    txt: "",
    txt2: ""
  },
  {
    id: 9,
    name: '어느 위치에 있는지 상세하게 설명한다.',
    img: instagram,
    txt: "#05. 같이 밥을 먹기로 한 친구가 식당 위치를 몰라 헤메고 있다.",
    txt2: "어떻게 설명해 줄까?"
  },
  {
    id: 10,
    name: '짧고 간단하게 주위 큰 건물 위주로 설명한다.',
    img: instagram,
    txt: "",
    txt2: ""
  },
  {
    id: 11,
    name: '오탈자, 줄 간격 등 세밀한 부분을 먼저 체크한다.',
    img: country,
    txt: "#06. 과제를 다 끝내고 최종 제출 전 마지막 검토를 해보자!",
    txt2: "어떤 부분을 먼저 살펴볼까?"
  },
  {
    id: 12,
    name: '전체적인 맥락을 먼저 확인하고 일관성이 없는 부분을 지운다.',
    img: country,
    txt: "",
    txt2: ""
  },
  {
    id: 13,
    name: '"어떤 시험인데?"라고 묻는다.',
    img: flex,
    txt: '"#07. 나 시험 떨어졌어."',
    txt2: "친구 말에 대한 나는 반응은?"
  },
  {
    id: 14,
    name: '"어떡해.. 힘들겠다. 나랑 맛있는 거 먹으러 가자! 다음엔 잘 될 거야!"라고 위로한다.',
    img: flex,
    txt: "",
    txt2: ""
  },
  {
    id: 15,
    name: '"고마워" 하고 속으로 내가 그렇게 힘들어 보였나? 되짚어본다.',
    img: location,
    txt: "#08. 요새 내가 힘들어 보인다며 케이크를 사 온 친구.",
    txt2: "나의 반응은?"
  },
  {
    id: 16,
    name: '"고마워 정말 감동이다ㅜㅜ"',
    img: location,
    txt: "",
    txt2: ""
  },
  {
    id: 17,
    name: '"헐, 뭐 먹고 배탈 난 거야?"',
    img: friends,
    txt: '"#09. 나 배탈 난 것 같아"라고 말하는 친구,',
    txt2: "나의 반응은 어떨까?"
  },
  {
    id: 18,
    name: '"괜찮아? 밥도 못 먹고 많이 힘들겠다.."',
    img: friends,
    txt: "",
    txt2: ""
  },
  {
    id: 19,
    name: '일단 놀고 한 목요일쯤? 임박했을 때 처리한다.',
    img: instagram,
    txt: "#10. 오늘은 월요일! 금요일까지인 과제가 나왔다. 하루 만에 다 할 수 있는 분량이다.",
    txt2: "이 과제, 어떻게 할까?"
  },
  {
    id: 20,
    name: '일주일 계획을 세우고 그것에 맞춰 일을 처리한다.',
    img: instagram,
    txt: "",
    txt2: ""
  },
  {
    id: 21,
    name: '웨이팅이 길면 그때 다른 근처 식당을 가면 된다. 일단 출발!',
    img: country,
    txt: "#11. 저녁시간, 친구와 함께 웨이팅이 종종 있는 맛집을 가기로 했다.",
    txt2: "출발하기 전 나의 행동은?"
  },
  {
    id: 22,
    name: '만일을 대비해 미리 다른 식당 몇 군데를 더 찾아본다.',
    img: country,
    txt: "",
    txt2: ""
  },
  {
    id: 23,
    name: '날 잡아서 정리하는 편이라 청소 먼저 해야 하는 상태',
    img: flex,
    txt: "#12. 오늘은 집에서 공부하기로 했다.",
    txt2: "내 책상의 상태는?"
  },
  {
    id: 24,
    name: '정리 정돈을 자주 하는 편이라 이미 깔끔한 상태',
    img: flex,
    txt: "",
    txt2: ""
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
            data[0] = 'qa'
        } else {
            data[0] = 'az'
        }

        resultValue = 0
        for(var i = 3; i < 6; i++){
            resultValue = resultValue + resultDataSet[i]
        }
        if(resultValue > 0){
            data[1] = 'ws'
        } else {
            data[1] = 'sx'
        }

        resultValue = 0
        for(var i = 6; i < 9; i++){
            resultValue = resultValue + resultDataSet[i]
        }
        if(resultValue > 0){
            data[2] = 'ed'
        } else {
            data[2] = 'dc'
        }

        resultValue = 0
        for(var i = 9; i < 12; i++){
            resultValue = resultValue + resultDataSet[i]
        }
        if(resultValue > 0){
            data[3] = 'rf'
        } else {
            data[3] = 'fv'
        }

      this.props.history.push({
        pathname: '/testresult',
        search: '?okm=' + data[0] + '&ijn=' + data[1] + '&uhb=' + data[2] + '&ygv=' + data[3],
      });
    }
  }

  moveHref = (data: DataInterface[]) => {
    beClicked = true;
    selected_name = 'true';
    this.props.history.push({
      pathname: '/testresult',
      search:
        '?okm=' +
        data[0].option.join(',') +
        '&ijn=' +
        data[1].option.join(',') +
        '&uhb=' +
        data[2].option.join(',') +
        '&ygv=' +
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
                txt={view.txt}
                txt2={view.txt2}
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
