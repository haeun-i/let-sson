import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";
import HeadButtons from "../component/layout/header/header";
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
`;

const LogText1 = styled.span`
  margin-left: 91px;
  margin-right: 108px;
  width: 87px;
  height: 26px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */
  color: #02001e;
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
`;

const FindInput = styled.input`
  position: absolute;
  width: 405px;
  height: 40px;

  border: 2px solid #463ea0;
  box-sizing: border-box;
  border-radius: 2px;
`;

const INITIAL_STATE = {
  tel: "",
  name: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.name };
    case "setTel":
      return { ...state, tel: action.tel };
    case "checkTel":
      return { ...state, tel: action.tel };
  }
};

const Findpassword = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const history = useHistory();

  useEffect(() => {
    if (state.tel.length === 10) {
      dispatch({
        type: "checkTel",
        tel: state.tel.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      });
    }
    if (state.tel.length === 13) {
      dispatch({
        type: "checkTel",
        tel: state.tel
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      });
    }
  }, [state.tel]);

  const confirm = async e => {
    e.preventDefault();
    const data = { name: state.name, tel: state.tel };
    console.log(data);
    await axios
      .get("http://localhost:8080/users/findPassword", {
        params: { name: state.name, tel: state.tel },
      })
      .then(function (response) {
        console.log(response);
        if (response.data === true) {
          alert("비밀번호 변경 페이지로 이동합니다.");
          history.push({
            pathname: "/fixpassword",
            state: { tel: state.tel },
          });
        } else if (response.data === false) {
          alert("회원정보와 일치하는 전화번호가 존재하지 않습니다.");
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const handleChangeN = e => {
    dispatch({ type: "setName", name: e.currentTarget.value });
  };
  const handleChangeP = e => {
    dispatch({ type: "setTel", tel: e.currentTarget.value });
  };

  return (
    <div>
      <HeadButtons />
      <Wrapper>
        <Circle>비밀번호 찾기</Circle>
        <Letters>"Better Education," Better Life</Letters>
        <Form>
          <FindText1>
            <label className="tofindtel">
              <LogText1>이름</LogText1>
              <FindInput
                type="text"
                onChange={handleChangeN}
                placeholder="이름"
              ></FindInput>
            </label>
          </FindText1>
          <FindText2>
            <label className="tofindtel">
              <LogText2>사용자 번호</LogText2>
              <FindInput
                type="text"
                placeholder="핸드폰 번호"
                value={state.tel}
                onChange={handleChangeP}
              ></FindInput>
            </label>
          </FindText2>
          <SuccessBtn type="submit" value="확인" onClick={confirm}></SuccessBtn>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Findpassword;
