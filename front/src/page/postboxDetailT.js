import React, { useState } from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Xbutton = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 0;
  margin-left: 75%;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #f6f4f3;
`;

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 720px;
  box-sizing: border-box;
  background-color: #f6f4f3;
`;

const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25%;
  margin-right: 25%;
  border-top: solid 3px #010440;
  background: white;
  margin-top: 30px;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;
const BoxShort = styled.div`
  border: 0.05em solid #010440;
  margin-right: 0;
  width: 55%;
  padding-right: 40%;
  padding-bottom: 30px;
`;

const PostboxDetailT = props => {
  const [data, setData] = useState({
    name: props.location.state.name,
    university : props.location.state.university,
    major : props.location.state.major,
    subject : props.location.state.subject,
    region : props.location.state.region,
    tel : props.location.state.tel,
    career : props.location.state.career,
    intro : props.location.state.intro,
    plan : props.location.state.plan,
  });

  const history = useHistory();
  const goBack = e => {
    history.goBack();
  };

  return (
    <div>
      <HeadButtons />
      <Wrapper>
        <Xbutton onClick={goBack}>X</Xbutton>
        <Box>
          <Text> 이름</Text>
          <BoxShort>{data.name}</BoxShort>
        </Box>
        <Box>
          <Text> 학교</Text>
          <BoxShort>{data.university}</BoxShort>
        </Box>
        <Box>
          <Text> 학과</Text>
          <BoxShort>{data.major}</BoxShort>
        </Box>
        <Box>
          <Text> 과목</Text>
          <BoxShort>{data.subject}</BoxShort>
        </Box>
        <Box>
          <Text> 지역</Text>
          <BoxShort>{data.region}</BoxShort>
        </Box>
        <Box>
          <Text> 전화번호</Text>
          <BoxShort>{data.tel}</BoxShort>
        </Box>
        <Box>
          <Text> 경력</Text>
          <BoxShort>{data.career}</BoxShort>
        </Box>
        <Box>
          <Text> 소개글</Text>
          <BoxShort>{data.intro}</BoxShort>
        </Box>
        <Box>
          <Text> 계획</Text>
          <BoxShort>{data.plan}</BoxShort>
        </Box>
      </Wrapper>
    </div>
  );
};

export default PostboxDetailT;
