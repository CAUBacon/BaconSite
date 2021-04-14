import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import RestaurantCard from '../../components/common/RestaurantCard';
import Loader from '../../components/common/Loader';
import React, { useEffect, useState } from 'react';
import useShops from '../../hooks/useShops';
import { getShopsInterface } from '../../api/getShops';
import Title from 'lib/meta';
import noResultCat from 'assets/NoResultCat.svg';
import noResultCat2 from 'assets/NoResultCat2.svg';
import ScrollToTopController from 'components/common/ScrollToTopController';
import palette from 'styles/palette';
import { Location } from 'api/getShop';
import country from 'assets/country.svg';
import flex from 'assets/flex.svg';
import friends from 'assets/friends.svg';
import instagram from 'assets/instagram.svg';
import location from 'assets/location.svg';
import report from 'modules/report';

const mbtiResultReport = [
  {
    id: 1,
    name: 'istj',
    title: '꼼꼼하고 모범적인',
    description: '당신은 꼼꼼하고 성실한 스타일입니다.',
    list: [ '책임감이 강하고 성실해서 주위 사람들 사이에서 신뢰도가 두터워요.',
            '매사 성실하고 부지런해서 한 번 세운 목표는 꾸준히 계획적으로 해낼 수 있어요.',
            '감각이 뛰어남과 동시에 철저하고 논리적이어서 회사같은 조직 내에서 일을 잘한다고 인정받는 사람들이 많아요.',
            '그렇지만 스트레스를 쌓아두는 것은 금물! 한꺼번에 폭발할 수 있기 때문에 가끔은 스트레스를 풀어주는 것이 어떨까요?',
            '일할 땐 일하고 놀 땐 놀아야지! 일 처리도 확실하고 노는 것도 확실해요.',
            '체계적이고 보상이 명확한 안정적인 조직에서 일하는 것을 선호해요.',],
    badpartner: ['enfp', 'entj', 'infj', 'estp'],
    goodparter: ['enfj', 'entp', 'isfp', 'infp'],
    food: '깔끔한 초밥',
    menu: '초밥',
    img: country,
  },
  {
    id: 2,
    name: 'isfj',
    title: '아낌없이 베푸는',
    description: '당신은 실속있고 성실한 스타일입니다.',
    list: [ '조용하고 차분하면서 따뜻하고 친근한 사람이에요. 자신의 친한 친구들이나 가족들에게 애정이 가득해요. 항상 진솔하기 위해 노력하기 때문에 관계에 있어 가장 믿음직스러워요.',
            '다른 사람들의 감정을 파악하는 데엔 선수지만 자신의 감정을 표현하는 데엔 서툴러서 관계에 대해 항상 걱정하고 있어요.',
            '부드럽고 다정하지만 때로는 상황에 따라 단호하고 냉정한 면도 있어요.',
            '눈치도 빠르고 공감 능력이 뛰어나 센스있게 행동하고 상대를 위하지만 정작 본인의 이야기는 잘 하지 않는 편이에요.',
            '조용하고 안정적인 삶을 추구하는 생활력 강한 집순이, 집돌이에요.',
            '사회적으로 좋은 사람으로 인식되는 편인데, 인내심이 많아서 계속 쌓아두었다가 폭발하는 편이에요. 그래서 화를 내는 경우는 정말 도가 넘친 상황이 많아요.',],
    badpartner: ['entp','intj', 'isfp', 'infj'], //entj
    goodparter: ['entj','enfp', 'intp', 'istp'], //entp, intp
    food: '실속있는 한우',
    menu: '한우', // + 곱창
    img: flex,
  },
  {
    id: 3,
    name: 'infj',
    title: '따뜻하고 섬세한',
    description: '당신은 공감하고 배려하는 스타일입니다.',
    list: [ '타인의 기분에 공감하는 능력이 뛰어나고 마음이 섬세한 사람이에요. 그러다보니 혼자만의 사색에 잠기는 시간이 많고 외로움에 대한 내성이 강해요.',
            '싸움이나 갈등을 싫어하고 정의감이 강해요.',
            '자기표현을 잘 못하지만 자신 만의 확실한 가치관이 있기 때문에 외부에 휘둘리지 않는 편이에요. 그래서 의지되고 센스 넘치는 리더로 활약하는 면도 많아요.',
            '자상하고 정이 많으며 책임감이 강해요.',
            '질서, 규칙에 엄격한 측면이 있거나 완벽주의이거나 결벽한 경향이 있기도 해요.',
            '다른 사람에게 도움을 주는 것을 좋아하고 인간관계에 강한 관심을 가지고 있어요.',],
    badpartner: ['estp', 'intp','estj','infp','isfj'], //intp의 이동
    goodparter: ['estj', 'istp'],
    food: '부드러운 리조또',
    menu: '리조또',
    img: friends,
  },
  {
    id: 4,
    name: 'intj',
    title: '연금술사',
    description: '당신은 논리적이고 독립적인 스타일입니다.',
    list: [ '이성, 논리, 체계에 대한 이해와 추론을 선호해요. 문제를 해결하려는 욕구가 강하고 그 누구보다 열정적이에요.',
            '창의적이고 참신한 발상으로 문제를 해결하고 아무도 생각지 못한 즉흥적인 발상으로 실용성을 높이고 사람들을 놀라게 해요.',
            '자기 통제력과 몰두가 강해서 한 번 설정한 목표는 살현될 때까지 전념하는 경향이 있어요.',
            '진지하고 생각이 많은데에다 감정 표현을 잘 하지 않아서 다른 사람들이 본인의 심리를 파악하는 것이 쉽지 않아요.',
            '우선순위나 가치가 유사한 사람들을 곁에 두고 싶어하고, 좋은 영향을 공유할 수 없다고 판단되는 사람과 친구 맺는 것을 거부할 줄 알아요. 그리고 요구 사항 같은거 돌려 말하는 거 질색이에요.',
            '사실 이런거 잘 안 믿어요. 그냥 한 번 해봤어요.',],
    badpartner: ['esfp','isfj','estj','intp'],
    goodparter: ['esfj', 'infp', 'enfp', 'estp', 'isfp'],
    food: '센세이션한 마라탕',
    menu: '마라탕',
    img: instagram,
  },
  {
    id: 5,
    name: 'istp',
    title: '혼자서도 잘하는',
    description: '당신은 적응력이 뛰어난 스타일입니다.',
    list: [ '조용하고 객관적으로 인생이나 사물을 관찰해요, 상황을 파악하는 민감성과 도구를 다루는 능력이 뛰어나요.',
            '필요 이상의 과시를 선호하지 않고, 가능한 에너지 소비를 하지 않으려 해요. 사실적인 자료를 정리하고 조직하기를 좋아하는 경향이 있어요.',
            '기게를 잘 다루거나 손재주가 좋고 다재다능한 당신은 스스로도 다른 사람들보다 월등하다고 생각하기도 해요.',
            '남 일에 그다지 관심이 없지만 거절을 잘 하지 못해요. 속마음을 드러내려고 하지 않고 마음에 안드는 사람은 바로 손절하는 경향이 강해서 냉정하다는 소리도 종종 들어요.',
            '이 세상에 믿을 사람은 오로지 나 하나 뿐이고 인생 흐름에 그저 몸을 맡겨봐요. ',
            '남한테 민폐 끼치는 것을 정말 싫어하는 당신은 뒷담화 하는 사람도 싫어하고 뒷담화도 안해서 카톡이나 다른 sns를 탈퇴하고 싶다는 생각을 계속 하고 있어요.',],
    badpartner: ['enfj'],
    goodparter: ['enfp','estp', 'infj'],
    food: '든든한 국밥',
    menu: '국밥',
    img: location,
  },
  {
    id: 6,
    name: 'isfp',
    title: '따뜻함을 지닌',
    description: '당신은 겸손한 외유내강 스타일입니다.',
    list: [ '배려하고 공감능력이 뛰어난 당신은 다른 사람의 의견을 잘 존중해줘요.',
            '말없이 다정하고 온화하며 사람들에게 친절하지만 상대방을 잘 알게 될 때까지는 내면의 모습을 잘 보이지 않아요. 갈등을 싫어하고 인간관계에 많은 에너지를 소모하는 편이에요.',
            '친한 사람에게 마저도 사실은 본인의 속마음을 비추지 않으려고 하고 누가 되었든 본인의 선을 넘는 것을 굉장히 싫어해요.',
            '낯을 많이 가리지만 다른 사람에게 맞춰주기 위해 만나는 사람에 따라 성격을 자유자재로 바꿀 수 있어요.',
            '양보를 잘하고 항상 겸손한 당신이지만 무언가를 거절하고 결정하는 것에 어려움을 느끼는 우유부단함도 있어요.',
            '사람이 많은 곳에 가면 기가 빨리는 것 같기도 하고 소심한 면모도 있지만 은근한 관종끼도 공존해요.',],
    badpartner: ['entj', 'infp', 'enfp', 'infj'], //enfp랑 잘 맞는다며!!!!1
    goodparter: ['entp','enfj', 'esfj', 'estj'],
    food: '촉촉한 찜닭', //케이크? 아이스크림?
    menu: '찜닭',
    img: country,
  },
  {
    id: 7,
    name: 'infp',
    title: '낭만을 꿈꾸는',
    description: '당신은 상냥하고 정의로운 스타일입니다.',
    list: [ '공감을 잘하고 상냥하며 평화주의적인 경향이 있어요. 다른 사람의 아픔에 대해 잘 알아줘서 사회 문제에도 관심을 갖는 경우가 많아요.',
            '자신의 가치관이 확고하고, 책임감이 강한데 일에도 공부에도 완벽주의 경향이 있어서 지나치게 열심히하는 면이 있어요.',
            '개성을 중시하기 때문에 이것이 발휘될 수 있는 환경에서 강하고 예술, 철학, 회화, 음악 등 자신의 생각이나 느낀 것을 형상화하는 것을 잘하고 매우 창의적이에요.',
            '반면 시키는 대로 일해야하는 환경에 다소 약한 면모가 있어요.',
            '책상 정리가 막 잘 되어 있는건 아니지만 일을 계획적으로 진행하는 데 무리는 없어요. 멀티태스킹보다는 한 가지 일에 집중해요.',
            '틀에 박히지 않은 사고방식에 독특한 세계관을 가지고 있어 사람들을 매료시키는 힘을 가지고 있어요. 이상과 현실 사이에서 괴로워 하지만 그 속에서 망상을 즐기는 타입이에요.',
            ],
    badpartner: ['estj'],
    goodparter: ['estp'],
    food: '지글지글 삼겹살', //와인 옆 불판에서 지글지글 구워지며 산과 달을 떠올리는 삼겹살
    menu: '삼겹살',
    img: flex
  },
  {
    id: 8,
    name: 'intp',
    title: '호기심 천국',
    description: '당신은 아이디어뱅크 전략가 스타일입니다.',
    list: [ '논리적이고 분석적이어서 문제 해결을 좋아하고 발상력, 창의력, 창조성이 뛰어나서 똑똑하고 말을 잘한다는 소리를 자주 들어요.',
            '평상시에는 조용해 보이지만, 친한 친구나 코드가 맞는 사람이 나타나면 말을 많이하는 편이에요.',
            '자기애가 많고 자기주관이 뚜렷하다는 소리를 자주 듣는 편이에요.',
            '남에게 피해를 끼치는 걸 정말 싫어하고 남일에 관심도 없어요.',
            '팀플을 정말 싫어해요. 사람많고 시끄러운 장소를 싫어하며 혼자 있을 때 가장 마음이 편해요. 시간약속 어기는 사람! 너무 싫어요.',
            '지적 호기심이 많고 지식에 대한 갈증이 항상 많은 당신은 무언갈 시작하면 끝장을 봐야 직성이 풀리는 성향이에요.',],
    badpartner: ['esfj'],
    goodparter: ['esfp', 'entj', 'enfj'],
    food: '조화로운 피자',
    menu: '피자',
    img: friends,
  },
  {
    id: 9,
    name: 'estp',
    title: '폼생폼사',
    description: '당신은 팔방미인 스타일입니다.',
    list: [ '개방적이고 센스 있고 유머러스한 당신은 문제해결력이 뛰어나고 어디서든 적응을 잘하며 친구들과 어울리기 좋아해요.',
            '세 줄 이상 안읽어요. 긴 설명을 좋아하지 않고 오감으로 느낄 수 있는 삶을 즐겨요.',
            '개그 욕심이 많고 관심 받는걸 좋아해서 누군가 자신 떄문에 폭소하고 관심을 준다면, 그 날 너무 기뻐서 잠도 제대로 못자요.',
            '순발력이 뛰어나고 많은 사실들을 쉽게 기억하며, 예술적인 멋과 판단력을 가지고 있어요.',
            '타고난 문제 해결사이면서 동시에 타고난 말썽꾸러기에요. 문제를 해결도 하고 유발도 해요.',
            '자신의 개성에 따라 행동하며 겁이 없고 위험천만한 행동을 상대적으로 자주 하는 경향이 있어요. 미재보단 지금 이 순간을 소중히 여겨요.',],
    badpartner: ['infj'],
    goodparter: ['infp'],
    food: '꼬불꼬불 파스타', // 꼬불꼬불 파스타?? 멋들어진 스테이크??
    menu: '파스타',
    img: instagram,
  },
  {
    id: 10,
    name: 'esfp',
    title: '분위기메이커인',
    description: '당신은 사교적인 스타일입니다.', //우호적인
    list: [ '활동적이고 수용력이 강한 당신은 어떤 집단에서든 밝고 재미있는 분위기를 조성하는 역할을 잘해요. 다른 사람들에게 친절하고 낙천적이에요.',
            '주위 사람이나 일에 관심이 많고 센스있고 유머러스한 사람이에요.',
            '발등에 불이 떨어져야 행동에 옮기곤 하지만 중요한 사항에 대해서는 즉시 처리하는 편이에요.',
            'sns 답장 속도가 모 아니면 도에요. 되게 빠르거나 안읽씹을 자주해요.',
            '개성적인 매력이 있어서 틀에 박힌 것을 싫어하고, 계획에 따라 하는 걸 힘들어하는 편이에요.',
            '자주 덜렁거리고 건망증도 심한 편이지만 정이 많아 거절을 잘 못하고 다른 사람을 기쁘게 해주는 것을 즐거워해요.',
            '고민하다가 스륵 잠이 들어버리고 청소나 빨래는 몰아서 꼭 해야할 때 하는 당신은 인생의 즐거움을 추구하는 사람이에요.'],
    badpartner: ['intj'],
    goodparter: ['intp'],
    food: '달달한 탕수육',
    menu: '탕수육',
    img: location,
  },
  {
    id: 11,
    name: 'enfp',
    title: '통통 튀는',
    description: '당신은 자유로운 스타일입니다.',
    list: [ '공감능력이 뛰어나고 처세가 능숙한 경향이 있어서 인간관계를 잘 구축해요.',
            '사람들과 활동하고 소통하는 것을 좋아하기 때문에 유머러스 하다는 평도 많이 듣는 당신은 근본적으로 사람을 좋아하고 상냥한 성격이에요.',
            '섬세한 면모도 있어서 고압적인 사람들에게는 위축되거나 다른 사람의 시선과 의견에 많이 의식하기도 해요.',
            '쉽게 열정적으로 행동에 옮기지만 재미가 없고 흥미가 떨어지면 바로 그만두는 경향이 있어요. 하지만 통찰력이나 직관력이 뛰어나서 직감한 것에서 서서히 체계적으로 일을 해나가요.',
            '전통이나 기존의 당연한 것들을 싫어하고 새로운 것을 매우 좋아해서 참신한 아이디어를 떠올리고 빠르게 행동에 옮기기도 해요.',
            '호기심이 많아 도전하는 것을 좋아하고 틀에 얽매이는 것을 좋아하지 않아요. 이상주의 경향이 있어서 뭐든지 완벽하게 완수하려는 완벽주의자 성향을 지니기도 해요.',],
    badpartner: ['istj'],
    goodparter: ['istp','isfp'],
    food: '매콤한 떡볶이',
    menu: '떡볶이',
    img: country,
  },
  {
    id: 12,
    name: 'entp',
    title: '카멜레온 같은',
    description: '당신은 도전적인 스타일입니다.',
    list: [ '풍부한 상상력과 새로운 일을 시도하는 솔선력이 강하고 논리적인 당신은 다방면에 관심과 재능이 많아요.',
            '새로운 도전이 없는 일에는 흥미가 없지만 관심을 갖고 있는 일에는 엄청 열정적으로 임해요.',
            '자기애가 강하고 인간관계가 자유롭지만 분위기나 다른 사람의 생각을 읽고 이해하는 능력이 뛰어나서 대화를 매력적으로 자신 위주로 이끌어 나가요.',
            '토론이나 논쟁을 좋아하고 자신의 의견으로 끝을 맺어야 하는 성향이 있어요.',
            '힘들어하는 상대에게 열심히 현실적이고 도움이 되는 조언들을 해주었지만 바뀌지 않고 의지하려고만 하는 사람들을 정말 싫어해요.',
            '벼락치기를 자주하는 편이지만 결과가 꽤 괜찮은 편이에요.',
            '눈치가 빠르지만 없는 척 하는 것이 편하다고 생각해서 눈치가 없는 것처럼 행동하는 경우가 있어요.'],
    badpartner: ['isfj'],
    goodparter: ['isfp'],
    food: '트렌디한 치킨',
    menu: '치킨',
    img: flex,
  },
  {
    id: 13,
    name: 'estj',
    title: '정의의 사도',
    description: '당신은 책임감이 강한 스타일입니다.',
    list: [ '책임감이 굉장히 강하고 사교적이어서 집단 내에서 두터운 신뢰와 많은 사랑을 받고 있어요.',
            '사물을 판단하는 속도가 빠르고 객관적인 시각으로 바라보기 때문에 리더로도 많이 활약해요.',
            '자신이 속한 집단을 소중히 여기는 경향이 있고, 질서나 규칙을 중요하게 생각해서 계획적이지 않은 사람을 보면 때로는 공격적이기도 해요.',
            '의지가 강하고 완고한 면이 있어서 일을 할 때 신뢰도가 돈독한 타입이에요.',
            '계획성이 높아서 장래를 위해 꾸준히 투자나 저금을 하고 있는 당신은 가정에서도 좋은 역할을 수행해요.',
            '윗사람을 공경하고 대인 관계를 중요하게 생각해요.',],
    badpartner: ['infp'],
    goodparter: ['infj','infj'],
    food: '위풍당당 돈까스',
    menu: '돈까스',
    img: friends,
  },
  {
    id: 14,
    name: 'esfj',
    title: '천사같은',
    description: '당신은 친절한 스타일입니다.',
    list: [ '다소 완벽주의에 준비성이 철저하고 참을성이 많으며 다른 사람을 잘 도와주는 사람이에요.',
            '공감 능력이 굉장히 좋아서 공감이 되지 않는 상황에서도 상대를 위해 가식적인 공감까지도 잘 해줘요. 다른 사람의 의견에 속으론 반대해도 겉으로는 "맞아 맞아"하며 맞장구를 쳐줘요.',
            '선생님들이나 강사들이 좋아해요. 강의 때 가장 고개를 잘 끄덕여 주거든요.',
            '조화와 균형을 매우 중시하는 당신은 다른 사람을 진심으로 이해하기 힘들면 "그럴 수 있지"라는 마음으로 넘어가곤 해요.',
            '기본적으로 신나고 재미있는 사람이어서 사람을 만나는 것을 좋아하고 사회생활을 잘하고 친구들이 두루두루 많은 편이에요.',
            '사람들을 절대 배신하지 않고, 눈치가 굉장히 빨라 옳고 그름도 날카롭게 구분할 수 있어요.',
            '본인은 맞춤법을 잘 지키려고 노력하지만, 타인의 실수를 지적하진 않아요. 하지만 물어보면 최선을 다해 설명해줘요.',],
    badpartner: ['intp'],
    goodparter: ['intj'],
    food: '상큼한 샐러드',
    menu: '샐러드',
    img: instagram,
  },
  {
    id: 15,
    name: 'enfj',
    title: '평화주의자',
    description: '당신은 배려 넘치는 스타일입니다.',
    list: [ '따뜻하고 적극적이면서 책임감도 강한 사람이에요. 타인에겐 관대하지만 본인에겐 매우 엄격한 당신은 자신의 일에 굉장히 열중해요.',
            '사교성이 풍부하고 동정심이 많아 남에게 잘 맞춰줘요. 가끔은 정이 너무 많아서 그만큼 상처도 잘 받고, 오랜 시간 아파해요.',
            '다른 사람의 어려움을 자신의 일처럼 도우며 보람을 느끼지만 정작 본인이 어려움에 처했을 때는 짐을 지게 하는 것이 싫어서 도움을 청하지 못하는 경우가 많아요.',
            '말로 표현을 잘하고 개방적이며 임기응변에 능해요.',
            '호기심이 많아서 무슨 일이든지 직접 해봐야 직성이 풀려요.',
            '다른 사람들과 잘 어울리고, 사람들과 직접 얼굴을 보며 의사소통하는 것을 선호해요.',],
    badpartner: ['istp'],
    goodparter: ['istj'],
    food: '오밀조밀 샌드위치', //오밀조밀 볶음밥??
    menu: '샌드위치',
    img: location,
  },
  {
    id: 16,
    name: 'entj',
    title: '카리스마 넘치는',
    description: '당신은 열정적인 스타일입니다.',
    list: [ '완벽과 효율성을 추구하는 당신은 일을 체계적이고 계획적으로 처리해요.',
            '고집이 센 것처럼 보이지만 자신의 생각이 잘못된 것이 확인되면 바로 수긍해요.',
            '호기심이 많고 지적 욕구가 강해서 항상 노력하고자 해요. ',
            '솔직하고 결단력과 통솔력이 있어서 일을 잘 추진해가는 사람이며 불도저와 워커홀릭 기질이 있어요. 일이 틀어지는 것보다 욕먹는 게 나아요.',
            '가까운 사람에게는 헌신적이지만 멀어지면 뒤도 돌아보지 않아요. 사람과 사람 사이에서 감정적인 교류보다는 아이디어를 나누고 협력하는 관계를 선호해요.',
            '혼자 있는 것을 좋아하지 않고, 일상적이고 반복되는 일을 싫어해요. 변화가 있는 삶을 즐기는 편이에요.',],
    badpartner: ['isfp'],
    goodparter: ['isfj'],
    food: '매운 불닭발', //매운 닭발?? 칼칼한 라면??
    menu: '닭발',
    img: friends,
  }
]



const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Nanum Gothic';
  font-size: 28px;
  font-weight: 500;
  color: white;
  text-align: center;
  margin-top: 60px;
`

const FoodContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Nanum Gothic';
  font-size: 35px;
  font-weight: 900;
  color: white;
  text-align: center;
  margin-top: 20px;
`

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Nanum Gothic';
  font-size: 20px;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
`

const ListContainer = styled.ul`
  background-color: white;
  background-color: rgba( 255, 255, 255, 0.7 );
  font-size: 10px;
  font-weight: 700;
  color: white;
  margin: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 13px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
`

const ListTextbox = styled.li`
  display: 100%;
  font-family: 'Nanum Gothic';
  font-size: 13px;
  font-weight: 500;
  color: black;
  margin-top: 7px;
  margin-bottom: 7px;
  margin-left: 13px;
  line-height: 25px;
  list-style-position: inside;
  text-indent: -18px;
  word-break: keep-all;

  ::before{
    content: "🍮";
    // content: "📌";
    margin-right: 5px;
  }
`

const FullPartnerContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Nanum Gothic';
  font-size: 20px;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
`

const PartnerContainer = styled.button`
  width: 50%;
  justify-content: center;
  font-family: 'Nanum Gothic';
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: white;
  background-color: rgba( 255, 255, 255, 0.7 );
  text-align: center;
  margin: 5px;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
`

const PartnerCategory = styled.div`
  display: 100%;
  justify-content: center;
  font-family: 'Nanum Gothic';
  font-size: 20px;
  font-weight: 700;
  color: black;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
`

const PartnerImage = styled.img`
  height: 80px;
  object-fit: contain;
`

const PartnerTitle = styled.div`
  display: 100%;
  justify-content: center;
  font-family: 'Nanum Gothic';
  font-size: 15px;
  font-weight: 500;
  color: black;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
`

const PartnerFood = styled.div`
  display: 100%;
  justify-content: center;
  font-family: 'Nanum Gothic';
  font-size: 15px;
  font-weight: 700;
  color: black;
  text-align: center;
  margin-bottom: 30px;
`

const RecommendTitle = styled.div`
  display: 100%;
  text-align: center;
  font-family: 'Nanum Gothic';
  font-size: 20px;
  font-weight: 700;
  color: black;
  margin-top: 10px;
  margin-bottom: 20px;
`

const FoodingContainer = styled.button`
  height: 100px;
  width: 100%;
  // display: 100%;
  justify-content: center;
  text-align: center;
  background-color: white;
  background-color: rgba( 255, 255, 255, 0.05 );
  font-size: 30px;
  font-weight: 700;
  color: white;
  margin: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 13px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
`

const NoResultComment = styled.h1`
  font-size: 17px;
  font-family: 'Nanum Gothic';
  font-weight: 900;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  color: white;
`;

const SimpleImage = styled.img`
  height: 150px;
  object-fit: contain;
`;

const SimpleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 30px;
`;

const Divider = styled.div`
  border-bottom: 0px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 60px;
`;

const TopDivider = styled.div`
  border-bottom: 0px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 60px;
`;

const RestaurantCardContainer = styled.div`
  & > a {
    margin: 12.5px 0;
    display: block;
    text-decoration: none;
    color: inherit;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 35px;
  padding-bottom: 15px;
  .buttonElement {
    border: none;
    outline: none;
    margin: 0;
    flex: 1;
    max-width: 150px;
    padding: 10px;
    background-color: ${palette.white};
    color: black;
    font-weight: lighter;
    font-size: 13px;
    font-family: 'Nanum Gothic';

    /* transition: background-color 0.3s; */

    &:nth-child(1) {
      border-radius: 10px 0 0 10px;
    }
    &:nth-child(3) {
      border-radius: 0 10px 10px 0;
    }
    &.selected {
      background-color: ${palette.middleLightGray};
      font-weight: bolder;
    }
  }
`;


function TestResultPage({ location }: RouteComponentProps) {
  const [resultMBTI, setResultMBTI] = useState('');
  const [resultTitle, setResultTitle] = useState('');
  const [resultDescription, setResultDescription] = useState('');
  const [resultList, setResultList] = useState(['']);
  const [resultBadpartner, setResultBadpartner] = useState('');
  const [resultGoodpartner, setResultGoodpartner] = useState('');
  const [resultFood, setResultFood] = useState('');
  const [resultImg, setResultImg] = useState('');
  const [resultMenu, setResultMenu] = useState('');
  const [badTitle, setBadTitle] = useState('');
  const [badFood, setBadFood] = useState('');
  const [badImg, setBadImg] = useState('');
  const [goodTitle, setgoodTitle] = useState('');
  const [goodFood, setgoodFood] = useState('');
  const [goodImg, setgoodImg] = useState('');

  const { onGetShops, shops } = useShops();

  const [isSearch, setIsSearch] = useState(false);

  type LocationFilter = 'all' | 'front' | 'back';

  const [locationFilter, setLocationFilter] = useState<LocationFilter>('all');


  useEffect(() => {
    let resultMBTI = '';

    const param = location.search
      .split('?')[1]
      .split('&')
      .map((data) => data.split('='));

    param.forEach((option) => {
      if (
        option[0] === 'ei' ||
        option[0] === 'sn' ||
        option[0] === 'tf' ||
        option[0] === 'pj'
      ) {
        resultMBTI = resultMBTI + option[1];
      } 
    });
    console.log(resultMBTI)
    setResultMBTI(resultMBTI)

    var searchMenu = ''
    var goodmbti = ''
    var badmbti = ''

    mbtiResultReport.forEach((report) => {
      if (report.name == resultMBTI){
        setResultTitle(report.title)
        setResultDescription(report.description)
        setResultFood(report.food)
        setResultList(report.list)
        setResultGoodpartner(report.goodparter[0])
        setResultBadpartner(report.badpartner[0])
        setResultImg(report.img)
        setResultMenu(report.menu)
        searchMenu = report.menu
        goodmbti = report.goodparter[0]
        badmbti = report.badpartner[0]
      }
    })

    mbtiResultReport.forEach((report) => {
      if (report.name == goodmbti){
        setgoodTitle(report.title)
        setgoodFood(report.food)
        setgoodImg(report.img)
      }
      else if(report.name == badmbti){
        setBadTitle(report.title)
        setBadFood(report.food)
        setBadImg(report.img)
      }
    })


    let isDetail = false;
    let options: getShopsInterface = {};
    
    options = {
      ...options,
      ['name']: searchMenu,
    } 
    setIsSearch(true);
    onGetShops(options, isDetail);

  }, [location, onGetShops]);

  function moveToHome(){
    window.location.href='http://caufooding.com'
  }

  function moveToPartner(mbti: string) {
    console.log(mbti)
    window.location.href=`http://caufooding.com/testresult?ei=${mbti[0]}&sn=${mbti[1]}&tf=${mbti[2]}&pj=${mbti[3]}`
  }

  return (
    <Container color="red">
      <Title title="당신만을 위한 식당 - 푸딩" />
      <Header category="modal" headerColor="red" />
      <TitleContainer>
        {resultTitle}
      </TitleContainer>
      <FoodContainer>
        {resultFood}
      </FoodContainer>
      <SimpleImageContainer>
        <SimpleImage src={resultImg}/>
      </SimpleImageContainer>
      <DescriptionContainer>
        {resultDescription}
      </DescriptionContainer>
      <ListContainer>
        {/* <ListTextbox>
          {resultList}
        </ListTextbox> */}
        {resultList.map(index => {
          return <ListTextbox>{index}</ListTextbox>
        })}
      </ListContainer>
      <FullPartnerContainer>
        <PartnerContainer onClick={() => moveToPartner(resultGoodpartner)}>
          <PartnerCategory>잘 맞는 음식</PartnerCategory>
          <PartnerImage src={goodImg}></PartnerImage>
          <PartnerTitle>{goodTitle}</PartnerTitle>
          <PartnerFood>{goodFood}</PartnerFood>
        </PartnerContainer>
        <PartnerContainer onClick={() => moveToPartner(resultBadpartner)}>
          <PartnerCategory>안 맞는 음식</PartnerCategory>
          <PartnerImage src={badImg}></PartnerImage>
          <PartnerTitle>{badTitle}</PartnerTitle>
          <PartnerFood>{badFood}</PartnerFood>
        </PartnerContainer>
      </FullPartnerContainer>
      {/* <div>{resultMBTI}</div>
      <div>최고의 궁합</div>
      <div>{resultGoodpartner}</div>
      <div>최악의 궁합</div>
      <div>{resultBadpartner}</div> */}
      <ListContainer>
        <RecommendTitle>🐱 맞춤 식당 추천 🐱</RecommendTitle>
      {shops.loading ? (
        <Loader color="white" />
      ) : shops.data ? (
        <>
          {shops.data.length === 0 ? (
            <>
              <ScrollToTopController />
              <TopDivider></TopDivider>
              <NoResultComment>앗, 검색 결과가 없습니다!</NoResultComment>
              <Divider></Divider>
              <SimpleImageContainer>
                <SimpleImage src={isSearch ? noResultCat2 : noResultCat} />
              </SimpleImageContainer>
              <Divider></Divider>
              {isSearch ? <NoResultComment>다른 검색어로</NoResultComment> : <NoResultComment>다른 옵션으로</NoResultComment>}
              <NoResultComment>다시 검색해주세요</NoResultComment>
            </>
          ) : (
            <>
              <ScrollToTopController />
              {/* <FilterContainer>
                <button onClick={() => setLocationFilter('all')} className={`buttonElement ${locationFilter === 'all' ? 'selected' : ''}`}>
                  전체
                </button>
                <button onClick={() => setLocationFilter('front')} className={`buttonElement ${locationFilter === 'front' ? 'selected' : ''}`}>
                  정문
                </button>
                <button onClick={() => setLocationFilter('back')} className={`buttonElement ${locationFilter === 'back' ? 'selected' : ''}`}>
                  후문
                </button>
              </FilterContainer> */}
              <RestaurantCardContainer>
                {shops.data
                  .filter((shop) => {
                    if (locationFilter === 'all') return true;
                    else if (locationFilter === 'front') {
                      return ([Location.Front, Location.FrontFar, Location.HsStation] as Location[]).includes(shop.location);
                    } else if (locationFilter === 'back') {
                      return ([Location.Back] as Location[]).includes(shop.location);
                    }
                  })
                  .slice(0,3).map((shop, index) => (
                    <Link to={`/shop/${shop._id}`} key={shop._id}>
                      <RestaurantCard shop={shop} delay={index * 50} />
                    </Link>
                  ))}
              </RestaurantCardContainer>
            </>
          )}
        </>
      ) : (
        <>
          <TopDivider></TopDivider>
          <NoResultComment>앗, 결과를 받아올 수 없었어요!</NoResultComment>
          <Divider></Divider>
          <SimpleImageContainer>
            <SimpleImage src={noResultCat} />
          </SimpleImageContainer>
          <Divider></Divider>
          <NoResultComment>잠시 후에</NoResultComment>
          <NoResultComment>다시 시도해주세요</NoResultComment>
        </>
      )}
      </ListContainer>
      <FoodingContainer onClick={moveToHome}>Fooding 바로가기</FoodingContainer>
    </Container>
  );
}

// /5f26b992555be6865ede4e28

export default TestResultPage;
