import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import axios from "axios";
import StuLogin from "../component/feature/login/stulogin";
import TeaLogin from "../component/feature/login/tealogin";
import mypic from "./login_background.png";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${mypic});
`;

const Logindiv = styled.div`
  position: absolute;
  width: 80vw;
  height: 60vh;
  top: 20vh;
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
  font-size: 20px;
  line-height: 29px;
  /* identical to box height */

  left: 14vw;
  top: 4.5vh;
  color: #02001e;
`;
const Line1 = styled.span`
  position: absolute;
  width: 22px;
  height: 0px;

  border: 3px solid #000000;
  transform: rotate(-90deg);
  left: 11vw;
  top: 10vh;
`;

const Logline = styled.span`
  position: absolute;
  width: 304px;
  left: 35%;
  top: 30vh;
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
  margin-left: 37%;
  top: 80%;
  margin-top: 95px;
`;

const NotlogText = styled.div`
  display: inline;
  left: 50%;
`;
const NotlogBtn = styled.button`
  background-color: #f6f4f3;
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

const Login2 = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <HeadButton />
      <LoginContext.Provider value={{ state, dispatch }}>
        <Wrapper>
          <Line1></Line1>
          <Logintext>로그인</Logintext>
          <Logindiv>
            <StuLogin />
            <Logline></Logline>
            <TeaLogin />
          </Logindiv>
          {/* <Notlog>
            <Notlog1>
              <NotlogText>계정이 없으시다면?</NotlogText>
              <Link to="/stusign">
                <NotlogBtn>학생가입</NotlogBtn>
              </Link>
              <Link to="/teasign">
                <NotlogBtn>선생님가입</NotlogBtn>
              </Link>
            </Notlog1>
            <Notlog2>
              <NotlogText>비밀번호를 잊으셨다면?</NotlogText>
              <Link to="/findid">
                <NotlogBtn>아이디찾기</NotlogBtn>
              </Link>
              <Link to="/findpassword">
                <NotlogBtn>비밀번호찾기</NotlogBtn>
              </Link>
            </Notlog2>
          </Notlog> */}
        </Wrapper>
      </LoginContext.Provider>
    </div>
  );
};

export default Login2;
