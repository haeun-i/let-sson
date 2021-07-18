import React from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import PostboxListRS from "../component/feature/postbox/postboxListRS";
import postboxbackg from "./postboxbackg.jpg";
// 학생이 받은 내역

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

class PostboxRecieveS extends React.Component {
  render() {
    return (
      <div>
        <HeadButtons />
        <Wrapper>
          <Text2>
            <hr color="#0D00A4" width="45px" height="10px"></hr>
            <Blue>받은</Blue> 내역함
          </Text2>
          <PostboxListRS />
        </Wrapper>
      </div>
    );
  }
}

export default PostboxRecieveS;
