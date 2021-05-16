import React from "react";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  background-color: #f6f4f3;
  position: absolute;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SuccessText = styled.div`
  position: absolute;
  width: 231px;
  height: 35px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;

  color: #02001e;
  padding-right: 30px;
  margin-bottom: 5%;
`;

const SuccessBtn1 = styled.button`
  border-top: solid 3px #010440;
  border-left: none;
  border-right: none;
  border-bottom: none;
  background-color: white;
  font-size: 16px;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 150px;
  margin-bottom: 30px;
  padding: 0 15px 0 15px;
`;

const SuccessBtn2 = styled.button`
  border-top: solid 3px #010440;
  border-left: none;
  border-right: none;
  border-bottom: none;
  background-color: white;
  font-size: 16px;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  padding: 0 15px 0 15px;
`;

class Loginsuccess extends React.Component {
  render() {
    return (
      <div>
        <HeadButton />
        <Wrapper>
          <SuccessText>로그인이 완료 되었습니다.</SuccessText>
          <div>
            <Link to="/findteacher">
              <SuccessBtn1>선생님 찾으러가기</SuccessBtn1>
            </Link>
            <Link to="/findstudent">
              <SuccessBtn2>학생 찾으러가기</SuccessBtn2>
            </Link>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default Loginsuccess;
