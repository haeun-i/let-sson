import React, { useState } from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Body = styled.div`
  overflow: auto;
  background-color: #f5f4f2;
`;

const Profilebox = styled.span`
  width: 300px;
  height: 300px;
  margin-right: 0;
  margin-left: 5%;
`;
const Text2 = styled.span`
  margin-right: 0;
  margin-left: 3%;
  color: #463ea0;
  font-size: 20px;
`;

const Text3 = styled.span`
  font-size: 18px;
`;

const Xbutton = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 0;
  margin-left: 45%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  left: 20vw;
  top: 35vh;
  width: 60vw;
  padding-top: 5%;
  margin-bottom: 30px;
  border-top: solid 20px #463ea0;
  border-left: solid 40px #463ea0;
  border-right: solid 40px #463ea0;
  border-bottom: solid 20px #463ea0;
  margin-top: 10%;
  margin-left: 20%;
  background-color: white;
`;

const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3vw;
  margin-top: 30px;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  color: #463ea0;
  font-size: 1em;
`;

const BoxShort = styled.div`
  margin-right: 0;
  width: 90%;
  height: 10vh;
  padding-bottom: 0px;
  background-color: #f4f4fc;
  border: 3px solid #f4f4fc;
  box-sizing: border-box;
`;
const PostboxDetailT = props => {
  const [data, setData] = useState({
    name: props.location.state.name,
    university: props.location.state.university,
    major: props.location.state.major,
    subject: props.location.state.subject,
    region: props.location.state.region,
    tel: props.location.state.tel,
    career: props.location.state.career,
    intro: props.location.state.intro,
    plan: props.location.state.plan,
  });

  const history = useHistory();
  const goBack = e => {
    history.goBack();
  };

  return (
    <div>
      <HeadButtons />
      <Body>
        <Wrapper>
          <Profilebox>
            <Text2>{data.name}</Text2>
            <Text3>의 프로필입니다.</Text3>
          </Profilebox>
          <Xbutton onClick={goBack}>X</Xbutton>
          <Box>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            <Text> 이름</Text>
            <BoxShort>{data.name}</BoxShort>
          </Box>
          <Box>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            <Text> 학교</Text>
            <BoxShort>{data.university}</BoxShort>
          </Box>
          <Box>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            <Text> 학과</Text>
            <BoxShort>{data.major}</BoxShort>
          </Box>
          <Box>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            <Text> 과목</Text>
            <BoxShort>{data.subject}</BoxShort>
          </Box>
          <Box>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            <Text> 지역</Text>
            <BoxShort>{data.region}</BoxShort>
          </Box>
          <Box>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            <Text> 전화번호</Text>
            <BoxShort>{data.tel}</BoxShort>
          </Box>
          <Box>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            <Text> 경력</Text>
            <BoxShort>{data.career}</BoxShort>
          </Box>
          <Box>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            <Text> 소개글</Text>
            <BoxShort>{data.intro}</BoxShort>
          </Box>
          <Box>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            <Text> 계획</Text>
            <BoxShort>{data.plan}</BoxShort>
          </Box>
        </Wrapper>
      </Body>
    </div>
  );
};

export default PostboxDetailT;
