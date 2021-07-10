import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { LoginContext } from "../../../page/login";

const Log = styled.form`
  background-color: white;
  position: absolute;
  width: 20vw;
  height: 180px;
  margin-left: 3vw;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 950px) {
    position: unset;
    margin-left: 35%;
  }
`;
const LogText1 = styled.div`
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
  margin-left: 3%;
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
    margin-left: 13vw;
  }
  @media only screen and (max-width: 650px) {
    margin-left: 10vw;
  }
`;
const Text = styled.span`
  font-family: Noto SANS KR;
  font-size: 15px;
  line-height: 20px;
  margin-left: 15vw;
  -webkit-text-decoration: underline;
  text-decoration: underline;
  position: absolute;
  top: 3vh;

  @media only screen and (max-width: 950px) {
    margin-left: 10vw;
  }
  @media only screen and (max-width: 550px) {
    margin-left: 5vw;
  }
`;

const StuLogin = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(LoginContext);

  useEffect(() => {
    if (state.telS.length === 10) {
      dispatch({
        type: "checkTelS",
        telS: state.telS.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      });
    }
    if (state.telS.length === 13) {
      dispatch({
        type: "checkTelS",
        telS: state.telS
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      });
    }
  }, [state.telS]);

  const PhoneInput = e => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      dispatch({
        type: "checkTelS",
        telS: e.target.value,
      });
    }
  };

  const PasswordInput = e => {
    dispatch({ type: "checkPasswordS", passwordS: e.target.value });
  };

  const StuLoged = async e => {
    e.preventDefault();
    console.log(state.telS);
    console.log(state.passwordS);

    await axios
      .post("http://localhost:8080/students/login", {
        tel: state.telS,
        password: state.passwordS,
      })
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data);
        localStorage.setItem("role", "student");
        history.push("/loginsuccess");
      })
      .catch(err => {
        console.log(err.response);
        alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인 해주세요.");
      });
  };

  return (
    <div>
      <Text>학생 로그인</Text>
      <Log>
        <label className="phoneNum">
          <LogText1>휴대폰번호</LogText1>
          <br></br>
          <LogInput1
            type="text"
            value={state.telS}
            onChange={PhoneInput}
            placeholder="010-0000-0000"
          ></LogInput1>
        </label>
        <br></br>
        <label className="password">
          <LogText2>비밀번호</LogText2>
          <LogInput2
            type="password"
            value={state.passwordS}
            onChange={PasswordInput}
            placeholder="8글자 이상"
          ></LogInput2>
        </label>
        <LogBtns>
          <LogBtn type="submit" onClick={StuLoged} value="확인"></LogBtn>
        </LogBtns>
      </Log>
    </div>
  );
};

export default StuLogin;
