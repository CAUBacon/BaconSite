import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import palette from '../../styles/palette';
import Flag from '../../components/common/Flag';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
// import Button from './button';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';
import React from 'react';
import FullHeightFade from '../../components/common/FullHeightFade';
import wondering_cat from './wondering_cat.png';

interface ShopImageProps {
  imageLink: string;
}

const SimpleImage = styled.img`
  height: 150px;
  object-fit: contain;
`;

const SimpleText = styled.div`
  height: 100px;
  justify-content: center;
  text-align: center;
  color: white;
`

const SimpleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  margin-bottom: 50px;
  padding: 0 30px;
`;

const ImageContainer = styled.div`
  position: relative;
  vertical-align: middle;

  height: 42vw;
  width: 40vw;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 50px;

  background-color: transparent;
`;

const Image = styled.div`
  position: absolute;
  display: center;
  align: center;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props: ShopImageProps) =>
    props.imageLink &&
    css`
      background-image: url(${props.imageLink});
    `}
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${palette.mainRed};
  height: 80px;
`;

const Divider = styled.div`
  border-bottom: 0.1px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 30px;
`;

let beClicked = false;
let selected_name = 'false';

const moveHref = () => {
  beClicked = true;
  selected_name = 'true';
};

interface Props {
  id: number;
  name: string;
  txt: string;
  show: boolean;
  onChange: (e: number) => void;
}

const handleChange = (e: number) => {};

// interface Props extends RouteComponentProps {}

class YesNoDraw extends React.Component<Props> {
  props: Props = {
    id: 1,
    name: '',
    txt: '',
    show: false,
    onChange: handleChange,
  };

  handleClick(id: number) {
    // console.log(id)
    this.props.onChange(id);
  }

  render() {
    const { id, name, txt, show } = this.props;
    const path = './';

    return (
      <div
        className="yesNoDraw"
        style={{ display: show ? 'block' : 'none' }}
        onClick={() => {
          this.handleClick(id);
        }}
      >
        {id % 2 === 1 ? (
          <FullHeightFade>
            <SimpleImageContainer>
              {/* <SimpleImage src={img} /> */}
              <SimpleText>{txt}</SimpleText>
            </SimpleImageContainer>
          </FullHeightFade>
        ) : (
          <></>
        )}
        <FullHeightFade>
          <Button theme="white" big onClick={moveHref}>
            {name}
          </Button>
        </FullHeightFade>
      </div>
    );
  }
}

export default YesNoDraw;
