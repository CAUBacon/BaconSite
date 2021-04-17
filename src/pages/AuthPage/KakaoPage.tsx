import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import useKakao from '../../hooks/useKakao';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';
import useCheck from '../../hooks/useCheck';
import Loader from '../../components/common/Loader';
import StyledInput from '../../components/common/StyledInput';
import { AiOutlineIdcard } from 'react-icons/ai';
import gender from 'assets/gender.png';
import Button from '../../components/common/Button';
import Title from 'lib/meta';
import noResultCat from 'assets/NoResultCat.svg';

const InputBlock = styled.div`
  padding: 0 5%;

  text-align: center;
`;

const TitleBlock = styled.div`
  color: ${palette.mainRed};
  font-size: 25px;
  font-weight: bold;
  margin: 50px 0;
`;

const GenderWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 15px;

  margin-bottom: 50px;

  img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }

  button {
    flex: 1;
    /* margin: 0 10px; */
    padding: 7.5px 10px;
    border: 1px solid ${palette.mainRed};
    outline: none;
    background-color: transparent;
    border-radius: 10px 0 0 10px;
    color: ${palette.mainRed};
    transition: background-color 0.2s ease, color 0.2s ease;
    &.selected {
      color: ${palette.white};
      background-color: ${palette.mainRed};
    }
  }
  button + button {
    border-left: none;
    border-radius: 0 10px 10px 0;
  }
`;

const SimpleImage = styled.img`
  height: 150px;
  object-fit: contain;
  margin-bottom: 40px;
`;

const SimpleImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 30px;
  padding: 0 30px;

  div {
    text-align: center;
  }
`;

const ErrorMessage = styled.div`
  color: ${palette.mainRed};
  text-align: center;
  font-size: 12.5px;
  height: 16px;
  font-weight: lighter;
  margin-bottom: 20px;
`;

function KakaoPage({ location, history }: RouteComponentProps) {
  const code = location.search
    .split('?')
    .filter((data) => data)
    .map((data) => data.split('=')[1])[0];

  const {
    kakao,
    name,
    kakaoName,
    gender: genderInput,
    valid,
    onKakaoInit,
    onChangeInput,
    onKakaoRequestWithName,
    setGenderDispatch,
    setValidDispatch,
    setErrorMessageDispatch,
  } = useKakao(code);

  const { check, user } = useCheck();

  const onButtonClick = (id: string) => {
    onKakaoRequestWithName(id);
  };

  const [redir, setRedir] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    onKakaoInit();
  }, [onKakaoInit]);

  useEffect(() => {
    try {
      let redir = localStorage.getItem('redir');
      if (redir) setRedir(redir);
    } catch (error) {
      console.error('local storage 사용 불가');
    }
  }, []);

  useEffect(() => {
    if (kakaoName.data) {
      check();
    }
  }, [kakaoName, check]);

  useEffect(() => {
    if (kakao.data) {
      check();
    }
  }, [kakao, check]);

  const rediretForSuccess = useCallback(
    (user) => {
      try {
        localStorage.setItem('user', JSON.stringify(user));
        history.push(redir || '/');
      } catch (error) {
        console.error('localStorage 사용 불가');
      }
    },
    [history, redir],
  );

  useEffect(() => {
    if (user) {
      setError(false);
      rediretForSuccess(user);
    } else {
      setError(true);
    }
  }, [user, rediretForSuccess]);

  useEffect(() => {
    if (name.length === 0) {
      setValidDispatch(false);
      return;
    }
    if (name.length < 2 || name.length > 10) {
      setValidDispatch(false);
      setErrorMessageDispatch('닉네임은 2글자 이상, 10글자 이하로 이루어져야 합니다');
      return;
    }
    if (genderInput === '') {
      setValidDispatch(false);
      setErrorMessageDispatch('');
      return;
    }
    setValidDispatch(true);
    setErrorMessageDispatch('');
  }, [name, setValidDispatch, setErrorMessageDispatch, genderInput]);

  if (kakao.error) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <SimpleImageContainer>
          <SimpleImage src={noResultCat} />
          <div>로그인 중 오류가 발생했어요</div>
          <Button theme="red">
            <Link to="/auth/login">다시 로그인하러 가기</Link>
          </Button>
        </SimpleImageContainer>
      </Container>
    );
  }
  if (kakao.data === null || kakao.loading) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <Loader />
      </Container>
    );
  }

  if (kakao.data!.status === 303) {
    return (
      <Container color="white">
        <Title title="카카오 로그인 - 푸딩" />
        <Header category="modal" headerColor="white" />
        <InputBlock>
          <TitleBlock>카카오 로그인</TitleBlock>
          <StyledInput name="name" type="text" onChange={onChangeInput} placeholder="닉네임" value={name} icon={<AiOutlineIdcard />} />
          <GenderWrapper>
            <img src={gender} alt="gender 이미지" />
            <button type="button" className={cx({ selected: genderInput === 'm' })} onClick={() => setGenderDispatch('m')}>
              남자
            </button>
            <button type="button" className={cx({ selected: genderInput === 'f' })} onClick={() => setGenderDispatch('f')}>
              여자
            </button>
          </GenderWrapper>
          <ErrorMessage>{kakaoName.error}</ErrorMessage>
          <Button theme="red" middle fullWidth onClick={() => onButtonClick(kakao.data!.id)} disabled={!valid}>
            {kakaoName.loading ? '로딩 중' : '가입 완료'}
          </Button>
        </InputBlock>
      </Container>
    );
  }

  return (
    <Container color="white">
      <Header category="modal" headerColor="white" />
      <Loader />
    </Container>
  );
}

export default KakaoPage;
