import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import axios from "axios";
import backImg from "./idpassword.jpg";
const Wrapper = styled.div`
  background-color: #e5e5e5;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      0deg,
      rgba(247, 247, 247, 0.9),
      rgba(247, 247, 247, 0.9)
    ),
    no-repeat 0 0 url(${backImg});
  background-size: cover;
`;

const Letters = styled.div`
  margin-top: -500px;
  margin-left: -500px;

  position: absolute;
  text-align: center;
  width: 200px;
  height: 100px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;

  color: #0d00a4;
  @media only screen and (max-width: 1004px) {
    display: none;
  }
  @media only screen and (max-height: 785px) {
    display: none;
  }
`;
const Circle = styled.div`
  margin-top: -560px;
  margin-right: -550px;
  text-align: center;
  line-height: 200px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
  @media only screen and (max-width: 1004px) {
    border-radius: 0px;
    width: 200px;
    height: 0px;
    color: #8983d2;
    margin-right: 0px;
  }
  @media only screen and (max-height: 785px) {
    border-radius: 0px;
    width: 200px;
    height: 0px;
    color: #8983d2;
    margin-right: 0px;
  }
`;
const Form = styled.form`
  position: absolute;
  width: 755px;
  height: 307px;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(157, 157, 157, 0.25);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 805px) {
    width: ${props => (props.span ? (props.span / 12) * 100 : "95")}%;
  }
`;
const FindText1 = styled.div`
  margin-top: 77px;
  padding-right: 10px;
  padding-bottom: 20px;
`;
const FindText2 = styled.div`
  margin-top: 35px;
  padding-right: 10px;
  padding-bottom: 20px;
`;

const SuccessBtn = styled.input`
  width: 77px;
  height: 32px;

  background: #463ea0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-left: 600px;
  margin-top: 40px;
  color: white;

  border: 0;
  outline: 1;
  @media only screen and (max-width: 805px) {
    margin-left: ${props => (props.span ? (props.span / 12) * 100 : "80")}%;
  }
`;

const LogText1 = styled.span`
  margin-left: 91px;
  margin-right: 90px;
  width: 87px;
  height: 26px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */
  color: #02001e;
  @media only screen and (max-width: 805px) {
    margin-left: ${props => (props.span ? (props.span / 12) * 100 : "12.5")}%;
    margin-right: 50px;
  }
`;

const LogText2 = styled.span`
  margin-left: 89px;
  margin-right: 50px;
  width: 71px;
  height: 26px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  color: #02001e;
  @media only screen and (max-width: 805px) {
    margin-left: ${props => (props.span ? (props.span / 12) * 100 : "12.5")}%;
    margin-right: 10px;
  }
`;

const FindInput = styled.input`
  position: absolute;
  width: 405px;
  height: 40px;

  border: 2px solid #463ea0;
  box-sizing: border-box;
  border-radius: 2px;
  @media only screen and (max-width: 805px) {
    width: ${props => (props.span ? (props.span / 20) * 100 : "53")}%;
  }
`;

const INITIAL_STATE = {
  checkpassword: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setPassword":
      return { ...state, password: action.password };
    case "setCheckpassword":
      return { ...state, checkpassword: action.checkpassword };
  }
};

const Fixpassword = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const history = useHistory();
  const location = useLocation();
  const tel = location.state.tel;

  const confirm = async e => {
    e.preventDefault();
    if (state.password !== state.checkpassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      const data = { password: state.password, tel: tel };
      console.log(data);
      await axios
        .put(
          `https://let-sson.herokuapp.com/users/resetPassword/?password=${state.password}&tel=${tel}`
        )
        .then(function (response) {
          console.log(response);
          alert("비밀번호 수정 완료.");
          history.push("/login");
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }
  };

  const handleChangeP = e => {
    dispatch({ type: "setPassword", password: e.currentTarget.value });
  };
  const handleChangeC = e => {
    dispatch({
      type: "setCheckpassword",
      checkpassword: e.currentTarget.value,
    });
  };

  return (
    <div>
      <HeadButton />
      <Wrapper>
        <Circle>비밀번호 변경</Circle>
        <Letters>"Better Education," Better Life</Letters>
        <Form>
          <FindText1>
            <label classpassword="tofindtel">
              <LogText1> 새 비밀번호 </LogText1>
              <FindInput
                type="text"
                placeholder="새 비밀번호"
                onChange={handleChangeP}
              ></FindInput>
            </label>
          </FindText1>
          <FindText2>
            <label classpassword="tofindtel">
              <LogText2>새 비밀번호 확인</LogText2>
              <FindInput
                type="text"
                placeholder="비밀번호 확인"
                onChange={handleChangeC}
              ></FindInput>
            </label>
          </FindText2>
          <SuccessBtn type="submit" value="확인" onClick={confirm}></SuccessBtn>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Fixpassword;
