import React from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import PostboxListST from "../component/feature/postbox/postboxListST";
import postboxbackg from "./postboxbackg.jpg";
// 선생이 보낸 내역

const Circle1 = styled.div`
  position: absolute;
  background-position: center;
  background-size: cover;
  margin-top: 25%;
  margin-left: 79%;
  text-align: center;
  line-height: 200px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  font-weight: bold;
  font-weight: bold;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
`;

const Circle2 = styled.div`
  position: absolute;
  background-position: center;
  background-size: cover;
  margin-top: 10%;
  margin-left: 9%;
  text-align: center;
  line-height: 200px;
  box-shadow: -90px -90px #f3f2fc;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  background-image: url(${postboxbackg});
  background-size: cover;
`;

const Blue = styled.span`
  color: #0d00a4;
`;

const Text2 = styled.div`
  position: absolute;
  margin-left: 18%;
  margin-right: 60%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

class PostboxSendT extends React.Component {
  render() {
    return (
      <div>
        <HeadButtons />
        <Wrapper>
          <Text2>
            <hr color="#0D00A4" width="45px" height="10px"></hr>
            <Blue>보낸</Blue> 내역함
          </Text2>
          <PostboxListST />
        </Wrapper>
      </div>
    );
  }
}

export default PostboxSendT;
