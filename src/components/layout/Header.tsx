import React from 'react';
import styled, { css } from 'styled-components';
import { MdClear, MdKeyboardArrowLeft } from 'react-icons/md';
import palette from '../../styles/palette';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import useCheck from '../../hooks/useCheck';
import FoodingTitleRed from './FoodingTitleRed.png';
import FoodingTitleWhite from './FoodingTitleWhite.png';

const HeaderBlock = styled.div`
  width: 100%;
  height: 60px;
`;

const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  align-items: center;
  ${(props: HeaderProps) =>
    css`
      if(props.headerColor !== 'none') {
        color: ${props.headerColor === 'red' ? palette.white : palette.mainRed};
      }
    `}

  img {
    width: 50px;
    height: 50px;
  }

  .titleLogo {
    width: 109px;
    height: 31px;
    margin: 0 auto;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-size: 2.5rem;
  }
  .left {
    position: absolute;
    left: 0;
    padding-left: 0;
  }

  .right {
    position: absolute;
    right: 0;
    /* margin-left: auto; */
    padding-right: 0;
  }
`;

type HeaderColor = 'red' | 'white' | 'none';
type Category = 'main' | 'modal';

interface HeaderProps extends RouteComponentProps {
  category: Category;
  headerColor: HeaderColor;
  onBack?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Header(props: HeaderProps) {
  const { user } = useCheck();

  const onLeftButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.category === 'modal') {
      props.history.goBack();
    }
  };

  const onRightButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.category === 'modal') {
      props.history.push('/');
    } else {
      if (user) {
        console.log('마이 페이지로 가자');
      } else {
        localStorage.setItem('redir', props.match.url);
        props.history.push('/auth/login');
      }
    }
  };

  return (
    <HeaderBlock>
      {props.category === 'main' ? (
        <HeaderContainer {...props}>
          {/* <button className="left">
            <img src={logo} style={{ width: '40px', height: '40px' }} alt="logo" />
          </button> */}
          <img className="titleLogo" src={props.headerColor === 'red' ? FoodingTitleWhite : FoodingTitleRed} alt="title" />
          {user ? (
            <button onClick={onRightButtonClick} className="right">
              <img src="https://ifh.cc/g/aVLW50.png" alt="mypage" />
            </button>
          ) : (
            <button onClick={onRightButtonClick} className="right">
              <img src="https://ifh.cc/g/eMtxxz.png" alt="login" />
            </button>
          )}
        </HeaderContainer>
      ) : (
        <HeaderContainer {...props}>
          <button onClick={onLeftButtonClick} className="left">
            <MdKeyboardArrowLeft />
          </button>
          <img className="titleLogo" src={props.headerColor === 'red' ? FoodingTitleWhite : FoodingTitleRed} alt="title" />
          <button onClick={onRightButtonClick} className="right">
            <MdClear />
          </button>
        </HeaderContainer>
      )}
    </HeaderBlock>
  );
}

export default withRouter(Header);
