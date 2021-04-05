import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
import Button from '../../components/common/Button';
// import Button from './button';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';
import React from 'react';
import FullHeightFade from '../../components/common/FullHeightFade';

const SimpleImage = styled.img`
  height: 150px;
  object-fit: contain;
`;

const SimpleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  margin-bottom: 50px;
  padding: 0 30px;
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
  img: string;
  show: boolean;
  onChange: (e: number) => void;
}

const handleChange = (e: number) => {};

// interface Props extends RouteComponentProps {}

class TestDraw extends React.Component<Props> {
  props: Props = {
    id: 1,
    name: '',
    img: '',
    show: false,
    onChange: handleChange,
  };

  handleClick(id: number) {
    // console.log(id)
    this.props.onChange(id);
  }

  render() {
    const { id, name, img, show } = this.props;
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
              <SimpleImage src={img} />
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

export default TestDraw;
