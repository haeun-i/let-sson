import React from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import PostboxListSS from "../component/feature/postbox/postboxListSS";
import postboxbackg from "./postboxbackg.jpg";
// 학생이 보낸 내역

const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
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

class PostboxSendS extends React.Component {
  render() {
    return (
      <div>
        <HeadButtons />
        <Wrapper>
          <Text2>
            <hr color="#0D00A4" width="45px" height="10px"></hr>
            <Blue>보낸</Blue> 내역함
          </Text2>
          <PostboxListSS />
        </Wrapper>
      </div>
    );
  }
}

export default PostboxSendS;
