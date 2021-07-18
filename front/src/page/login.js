import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import StuLogin from "../component/feature/login/stulogin";
import TeaLogin from "../component/feature/login/tealogin";
import mypic from "./login_background.png";
const Wrapper = styled.img`
  margin-top: 10px;
  width: 100vw;
  height: 100%;
  @media (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
`;

const Logindiv = styled.div`
  position: absolute;
  width: 80vw;
  height: 70%;
  @media only screen and (max-width: 950px) {
    height: 140%;
  }
  top: 34vh;
  left: 10vw;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(180, 180, 180, 0.25);
  border-radius: 3px;
  @media screen and (max-height: 490px) {
    margin-top: 20vh;
  }
  @media screen and (max-width: 791px) {
    margin-top: 15vh;
  }
  @media screen and (max-width: 791px) and (max-height: 480px) {
    margin-top: 25vh;
  }
  @media screen and (max-width: 791px) and (max-height: 450px) {
    margin-top: 30vh;
  }
  @media screen and (max-width: 791px) and (max-height: 400px) {
    margin-top: 35vh;
  }
  @media screen and (max-width: 500px) {
    margin-top: 30vh;
  }
  @media screen and (max-width: 430px) {
    margin-top: 40vh;
  }
  @media screen and (max-height: 350px) {
    display: none;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 0;
    top: 20vh;
  }
`;

const Logintext = styled.p`
  position: absolute;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 1em;
  /* identical to box height */
  left: 14vw;
  margin-left: 3vh;
  top: 23vh;
  color: #02001e;
  @media screen and (max-height: 490px) {
    margin-top: 20vh;
  }
  @media screen and (max-width: 791px) {
    margin-top: 15vh;
  }
  @media screen and (max-width: 791px) and (max-height: 480px) {
    margin-top: 25vh;
  }
  @media screen and (max-width: 791px) and (max-height: 450px) {
    margin-top: 30vh;
  }
  @media screen and (max-width: 791px) and (max-height: 400px) {
    margin-top: 35vh;
  }
  @media screen and (max-width: 500px) {
    margin-top: 30vh;
  }
  @media screen and (max-width: 430px) {
    margin-top: 40vh;
  }
  @media screen and (max-height: 350px) {
    display: none;
  }
`;
const Line1 = styled.span`
  position: absolute;
  width: 22px;
  height: 0px;
  color: black;
  border: 3px solid black;
  transform: rotate(-90deg);
  left: 11vw;
  top: 26.5vh;
  @media screen and (max-height: 490px) {
    margin-top: 20vh;
  }
  @media screen and (max-width: 791px) {
    margin-top: 13vh;
  }
  @media screen and (max-width: 791px) and (max-height: 480px) {
    margin-top: 25vh;
  }
  @media screen and (max-width: 791px) and (max-height: 450px) {
    margin-top: 30vh;
  }
  @media screen and (max-width: 791px) and (max-height: 400px) {
    margin-top: 35vh;
  }
  @media screen and (max-width: 500px) {
    margin-top: 30vh;
  }
  @media screen and (max-width: 430px) {
    margin-top: 40vh;
  }
  @media screen and (max-height: 350px) {
    display: none;
  }
`;

const Logline = styled.span`
  position: absolute;
  width: 20vw;
  left: 35%;
  top: 33vh;
  border: 1px solid #000000;
  transform: rotate(-90deg);

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const NotlogText = styled.div`
  display: inline;
  position: absolute;
  margin-left: 25%;
  top: 88%;
  @media screen and (max-width: 950px) {
    margin-left: 15vw;
    margin-top: 8vh;
  }
  @media only screen and (max-width: 750px) {
    margin-left: 10vw;
  }
  @media only screen and (max-width: 580px) {
    margin-left: 5vw;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    display: block;
    margin-top: 0;
    align-items: center;
    text-align: center;
    margin-left: 20vw;
  }
`;

const NotlogBtn1 = styled.button`
  position: absolute;
  margin-left: 48%;
  top: 88%;
  background-color: white;
  height: 10px;
  text-decoration: underline #010440;
  text-underline-position: under;
  @media only screen and (max-width: 950px) {
    margin-left: 38vw;
    margin-top: 8vh;
  }
  @media only screen and (max-width: 750px) {
    margin-left: 43vw;
  }
  @media only screen and (max-width: 580px) {
    margin-left: 41vw;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-left: 15vw;
    margin-bottom: 5vh;
    height: 5vh;
  }
`;

const NotlogBtn2 = styled.button`
  position: absolute;
  margin-left: 60%;
  top: 88%;
  background-color: white;
  height: 10px;
  text-decoration: underline #010440;
  text-underline-position: under;
  @media only screen and (max-width: 950px) {
    margin-left: 50vw;
    margin-top: 8vh;
  }
  @media only screen and (max-width: 750px) {
    margin-left: 58vw;
  }
  @media only screen and (max-width: 580px) {
    margin-left: 60vw;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-left: 45vw;
    margin-bottom: 5vh;
    height: 5vh;
  }
`;

const Tlog = styled.div``;

export const LoginContext = React.createContext();

const INITIAL_STATE = {
  telT: "",
  passwordT: "",
  telS: "",
  passwordS: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "checkTelT":
      return { ...state, telT: action.telT };
    case "checkPasswordT":
      return { ...state, passwordT: action.passwordT };
    case "checkTelS":
      return { ...state, telS: action.telS };
    case "checkPasswordS":
      return { ...state, passwordS: action.passwordS };
    default:
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <HeadButton />
      <LoginContext.Provider value={{ state, dispatch }}>
        <Wrapper src={mypic}></Wrapper>
        <Line1></Line1>
        <Logintext>로그인</Logintext>
        <Logindiv>
          <Tlog>
            <StuLogin></StuLogin>
            <Logline></Logline>
            <TeaLogin></TeaLogin>
          </Tlog>

          <NotlogText>비밀번호를 잊으셨다면?</NotlogText>
          <Link to="/findid">
            <NotlogBtn1>아이디찾기</NotlogBtn1>
          </Link>
          <Link to="/findpassword">
            <NotlogBtn2>비밀번호찾기</NotlogBtn2>
          </Link>
        </Logindiv>
      </LoginContext.Provider>
    </div>
  );
};

export default Login;
