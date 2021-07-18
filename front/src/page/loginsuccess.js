import React from "react";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import successbackg from "./successbackg.jpg";
import photo1 from "./logsucess1.jpg";
import photo2 from "./logsucess2.jpg";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${successbackg});
  background-size: cover;
  @media only screen and (max-width: 1273px) {
    background-size: contain;
  }
  @media only screen and (max-height: 580px) {
    background-size: contain;}
  @media only screen and (max-width: 665px){
    display:grid;
  }
`;
const SuccessText = styled.div`
  position: absolute;
  width: 290px;
  height: 35px;
  margin-top: -230px;
  margin-left: 950px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  font-weight: bold;
  line-height: 29px;

  color: #02001e;
  padding-right: 30px;
  margin-bottom: 5%;
  @media only screen and (max-width: 1273px) {
    margin-left: ${props => (props.span ? (props.span / 12) * 100 : "80")}%;
    width:${props => (props.span ? (props.span / 12) * 100 : "20")}%;
  }
  @media only screen and (max-width: 665px) {
    margin-top:${props => (props.span ? (props.span / 12) * 100 : "1")}%;
    
  }
  
  @media only screen and (max-width: 645px) {
  position: relative;   
  width:300px;
  margin-left:0px;
  padding-bottom:10px;
  }
`;

const SuccessBtn1 = styled.button`
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  margin-right: 24px;
  margin-bottom: 30px;

  color: white;
  width: 418px;
  height: 349px;

  background: linear-gradient(
      0deg,
      rgba(94, 94, 94, 0.2),
      rgba(94, 94, 94, 0.2)
    ),
    no-repeat 0 0
    url(${photo1});
  background-size: cover;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 5px rgba(0, 0, 0, 0.25);


  @media only screen and (max-width: 1273px) {
    width: ${props => (props.span ? (props.span / 12) * 100 : "32")}%;
  }
  @media only screen and (max-width: 705px) {
    width:226px;
  }
  @media only screen and (max-width: 580px){
    height: 200px;
    width:200px;
  }
`;

const SuccessBtn2 = styled.button`
  font-size: 18px;
  margin-top: 30px;
  margin-right: 150px;
  margin-bottom: 30px;

  color: white;
  width: 418px;
  height: 349px;

  background: linear-gradient(
      0deg,
      rgba(94, 94, 94, 0.2),
      rgba(94, 94, 94, 0.2)
    ),
    no-repeat 0 0
    url(${photo2});
  background-size: cover;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 5px rgba(0, 0, 0, 0.25);
  @media only screen and (max-width: 1273px) {
    width: ${props => (props.span ? (props.span / 12) * 100 : "32")}%;
  }
  @media only screen and (max-width: 705px) {
    width:226px;
  }
  @media only screen and (max-width: 580px){
    height: 200px;
    width:200px;
  }
`;

const Bigblue = styled.span`
  color: #0d00a4;
  font-size: 30px;
`;
const Blue = styled.span`
  color: #0d00a4;
`;

const Loginsuccess = () => {
  return (
    <div>
      <HeadButton />
      <Wrapper>
        <div>
          <Link to="/findteacher">
            <SuccessBtn1>
              선생님 찾으러가기<p></p>
              <div>
                <hr size="1" color="#FFEB34"></hr> <p></p>맞춤 추천으로<p></p>
                학생과 선생님과의<br></br> Needs 충족
              </div>
            </SuccessBtn1>
          </Link>
          <Link to="/findstudent">
            <SuccessBtn2>
              학생 찾으러가기<p></p>
              <div>
                <hr size="1" color="#FFEB34"></hr> <p></p>엄선된 선생님들로
                구성된<p></p>체계적인 관리와<br></br>교육 솔루션 제공
              </div>
            </SuccessBtn2>
          </Link>
        </div>
        <SuccessText>
          <Bigblue>"</Bigblue>
          로그인이 <Bigblue>완료</Bigblue> 되었습니다.<Bigblue>"</Bigblue>
          <hr size="3" color="#0D00A4"></hr>
          <p></p> <Blue>Better</Blue> Education<br></br> <Blue>Better</Blue>{" "}
          Life
        </SuccessText>
      </Wrapper>
    </div>
  );
};

export default Loginsuccess;
