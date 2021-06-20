import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import axios from "axios";
import StuLogin from "../component/feature/login/stulogin";
import TeaLogin from "../component/feature/login/tealogin";
import mypic from "./login_background.png";

const Wrapper = styled.img`
  margin-top : 10px;
  width: 100vw;
  height: 100vh;
`;

const Logindiv = styled.div`
  position : absolute;
  width: 80vw;
  height: 70%;
  top: 34vh;
  left: 10vw;

  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(180, 180, 180, 0.25);
  border-radius: 3px;
`;

const Logintext = styled.p`
  position: absolute;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 1em;
  /* identical to box height */

  left: 14vw;
  top: 22vh;
  color: #02001e;
`;
const Line1 = styled.span`
  position: absolute;
  width: 22px;
  height: 0px;
  color : black;
  border: 3px solid black;
  transform: rotate(-90deg);
  left: 11vw;
  top: 25.5vh;
`;

const Logline = styled.span`
  position: absolute;
  width: 20vw;
  left: 35%;
  top: 35vh;
  border: 1px solid #000000;
  transform: rotate(-90deg);
`;

const Notlog = styled.div`
  left: 10%;
`;

const Notlog1 = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  top: 70%;
  margin-left: 35%;
  margin-top: 75px;
`;

const Notlog2 = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  margin-left: 35%;
  top: 80%;
  margin-top: 95px;
`;

const NotlogText = styled.div`
display: inline;
position: absolute;
margin-left: 30%;
top: 88%;
}
`;
const NotlogBtn1 = styled.button`
position: absolute;
margin-left: 50%;
top: 88%;
  background-color: white;
  height: 10px;
  text-decoration: underline #010440;
  text-underline-position: under;
`;

const NotlogBtn2 = styled.button`
position: absolute;
margin-left: 60%;
top: 88%;
  background-color: white;
  height: 10px;
  text-decoration: underline #010440;
  text-underline-position: under;
`;


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
          <TeaLogin></TeaLogin>
          <Logline></Logline>
          <StuLogin></StuLogin>
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
