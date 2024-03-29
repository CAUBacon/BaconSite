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
import YesNoDraw from './YesNoDraw';

const base = [
  {
    id: 1,
    name: '담백한 아시아 동양식!',
    img: country,
  },
  {
    id: 2,
    name: '지구 반대편 서양식!',
    img: country,
  },
  {
    id: 3,
    name: 'FLEX 가능!',
    img: flex,
  },
  {
    id: 4,
    name: 'FLEX 불가능ㅠ',
    img: flex,
  },
  {
    id: 5,
    name: '현재 R&D관과 가까움',
    img: location,
  },
  {
    id: 6,
    name: '현재 310관과 가까움',
    img: location,
  },
  {
    id: 7,
    name: '요즘 대세인 혼밥',
    img: friends,
  },
  {
    id: 8,
    name: '함께 식사하는 합밥',
    img: friends,
  },
  {
    id: 9,
    name: '인별 감성★',
    img: instagram,
  },
  {
    id: 10,
    name: '아무렴 맛만 있음 됨',
    img: instagram,
  },
];

interface ShopImageProps {
  imageLink: string;
}

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${palette.mainRed};
  height: 80px;
`;

let beClicked = false;
let selected_name = 'false';
let resultDataSet = [true, true, true, true, true];
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

let data = ['', '', '', '', ''];

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

class YesNoPage extends React.Component<Props, State> {
  state: State = {
    views: [base[0], base[1]],
    result: [],
    round: 10,
    sequence: 0,
    end: false,
  };

  componentDidMount() {
    let imageList = [country, flex, instagram, location, friends];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  }

  handleReset() {
    this.setState({
      views: [base[0], base[1]],
      result: [],
      round: 10,
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
      resultDataSet[this.count - 1] = true;
    } else {
      resultDataSet[this.count - 1] = false;
    }

    this.setState((prevState) => ({
      sequence: prevState.sequence + 1, // sequence 1씩 증
      views: [base[2 * this.count], base[2 * this.count + 1]],
    }));

    if (this.count === 5) {
      data[0] = 'recommended';

      if (resultDataSet[0] === true) {
        data[1] = 'korean,chinese,japanese,school,other';
      } else {
        data[1] = 'western,fusion';
      }
      //서양식이 너무 적은거같아서 fusion은 서양이한테 줬음..ㅎ

      if (resultDataSet[1] === false) {
        data[2] = '5000,10000';
      }

      if (resultDataSet[2] === true) {
        data[3] = 'front,front_far,hs_station';
      } else {
        data[3] = 'back';
      }

      if (resultDataSet[3] === true) {
        if (resultDataSet[4] === true) {
          data[4] = 'individual,atmosphere';
        }else{
          data[4] = 'individual';
        }
      }else{
        if (resultDataSet[4] === true) {
          data[4] = 'atmosphere';
        }
      }


      //아니 근데 이러면 매운거 안먹고 싶어서 spicy선택 안했는데 individual만 선택해서 individual인데 spicy한거 나오면 어캄 하.. 고른 의미가 없잖아...

      this.props.history.push({
        pathname: '/result',
        search: '?order=' + data[0] + '&category=' + data[1] + '&price=' + data[2] + '&location=' + data[3] + '&keyword=' + data[4],
      });
    }
  }

  moveHref = (data: DataInterface[]) => {
    beClicked = true;
    selected_name = 'true';
    this.props.history.push({
      pathname: '/result',
      search:
        '?order=' +
        data[0].option.join(',') +
        '&category=' +
        data[1].option.join(',') +
        '&price=' +
        data[2].option.join(',') +
        '&location=' +
        data[3].option.join(',') +
        '&keyword=' +
        data[4].option.join(','),
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

export default YesNoPage;
