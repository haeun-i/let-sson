import { useHistory } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { LoginContext } from "../../../page/login";

const Log = styled.form`
  position: absolute;
  background-color: white;
  width: 200px;
  height: 180px;
  margin-left: 55%;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 950px) {
    margin-top: 45vh;
    margin-left: 35%;
  }
`;
const LogText1 = styled.span`
  position: absolute;
  top: 0vh;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #02001e;
`;
const LogText2 = styled.span`
  position: absolute;
  top: 20vh;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #02001e;
`;
const LogInput1 = styled.input`
  position: absolute;
  top: 7vh;
  width: 30vw;
  height: 40px;

  border: 2px solid #463ea0;
  box-sizing: border-box;
  border-radius: 2px;
`;

const LogInput2 = styled.input`
  position: absolute;
  top: 27vh;
  width: 30vw;
  height: 40px;

  border: 2px solid #463ea0;
  box-sizing: border-box;
  border-radius: 2px;
`;

const LogBtns = styled.div`
  margin-top: 10px;
`;
const LogBtn = styled.input`
  position: absolute;
  width: 112px;
  height: 35px;

  background: #463ea0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  position: absolute;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 1em;
  line-height: 26px;

  top: 39vh;
  left: 24vw;

  color: #ffffff;

  @media only screen and (max-width: 950px) {
    margin-left: -15vw;
  }
  @media only screen and (max-width: 650px) {
    margin-left: -18vw;
  }
`;

const Letsson = styled.p`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 2em;
  line-height: 26px;

  top: 39vh;
  left: 24vw;

  color: #ffffff;
`;

const TeaLogin = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(LoginContext);

  useEffect(() => {
    if (state.telT.length === 10) {
      dispatch({
        type: "checkTelT",
        telT: state.telT.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      });
    }
    if (state.telT.length === 13) {
      dispatch({
        type: "checkTelT",
        telT: state.telT
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      });
    }
  }, [state.telT]);

  const PhoneInput = e => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      dispatch({ type: "checkTelT", telT: e.target.value });
    }
  };

  const PasswordInput = e => {
    dispatch({ type: "checkPasswordT", passwordT: e.target.value });
  };

  const TeaLoged = async e => {
    e.preventDefault();
    console.log(state.telT);
    console.log(state.passwordT);

    await axios
      .post("http://localhost:8080/teachers/login", {
        tel: state.telT,
        password: state.passwordT,
      })
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data);
        history.push("/loginsuccess");
        localStorage.setItem("role", "teacher");
      })
      .catch(err => {
        console.log(err.response);
        alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인 해주세요.");
      });
  };

  return (
    <Log>
      <label className="phoneNum">
        <LogText1>휴대폰번호</LogText1>
        <LogInput1
          type="text"
          value={state.telT}
          onChange={PhoneInput}
          placeholder="010-0000-0000"
        ></LogInput1>
      </label>
      <br></br>
      <label className="password">
        <LogText2>비밀번호</LogText2>
        <LogInput2
          type="password"
          value={state.passwordT}
          onChange={PasswordInput}
          placeholder="8글자 이상"
        ></LogInput2>
      </label>

      <LogBtns>
        <LogBtn type="submit" onClick={TeaLoged} value="확인"></LogBtn>
      </LogBtns>
    </Log>
  );
};

export default TeaLogin;
