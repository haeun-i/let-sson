import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
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
  @media only screen and (max-width: 805px) {
    border-radius: 0px;
    width: 120px;
    height: 0px;
    color: #8983d2;
    margin-right: 0px;
  }
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
  @media only screen and (max-width: 805px) {
    display: none;
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
  margin-left: 89px;
  margin-right: 67px;
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
    margin-right: ${props => (props.span ? (props.span / 12) * 100 : "5.25")}%;
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
    margin-right: ${props => (props.span ? (props.span / 12) * 100 : "2")}%;
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
  email: "",
  name: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.name };
    case "setEmail":
      return { ...state, email: action.email };
  }
};

const Findid = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const history = useHistory();

  async function confirm(e) {
    e.preventDefault();
    const data = { name: state.name, email: state.email };
    try {
      const response = await axios.get("http://localhost:8080/users/findID", {
        params: { name: state.name, email: state.email },
      });
      alert("당신의 아이디는 " + response.data.data + " 입니다.");
      history.push("/login");
    } catch (error) {
      console.log(error.response);
      alert("존재하지 않는 사용자입니다.");
    }
  }

  const handleChangeN = e => {
    dispatch({ type: "setName", name: e.currentTarget.value });
  };
  const handleChangeE = e => {
    dispatch({ type: "setEmail", email: e.currentTarget.value });
  };

  return (
    <div>
      <HeadButton />
      <Wrapper>
        <Circle>아이디 찾기</Circle>
        <Letters>"Better Education," Better Life </Letters>
        <Form>
          <FindText1>
            <label className="tofindtel">
              <LogText1>사용자 이름</LogText1>
              <FindInput
                type="text"
                placeholder="이름을 입력해주세요"
                onChange={handleChangeN}
              ></FindInput>
            </label>
          </FindText1>
          <FindText2>
            <label className="tofindtel">
              <LogText2>사용자 E-mail</LogText2>
              <FindInput
                type="text"
                placeholder="이메일을 입력해주세요"
                onChange={handleChangeE}
              ></FindInput>
            </label>
          </FindText2>
          <SuccessBtn type="submit" value="확인" onClick={confirm}></SuccessBtn>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Findid;
