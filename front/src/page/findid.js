import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import axios from "axios";
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
    no-repeat 0 0
      url("https://s3-alpha-sig.figma.com/img/d3af/b44e/69f52ace71eecb6841506c4568930fcb?Expires=1621814400&Signature=h1N5-cxDFLEXwbkHz2aRe5IY6LBiuKvSMYMHZvnQMwB3H1uE-tigxj9jNCcZoD-l-c48jYmc1aNzhkXUwFKgq62X4o2LtFbb60J-CXfQTTHKZONLBRllZ7Xwwd9VpTwf8Zl8ozgdurehXFwyhh~u-K0BHWmO~TEB2KAfDQ1q6ZE8Op9QjktibI8KECObr2P7JP54uMR-h7WaEXP8K6pWIuWAdEtiWVRMmLXvL7z1RLpTaSVOAp~he~A-FaMuwDPXK6meWeoJ-UgRYPih~NU9m8USnikAj40R8AYC2JNdI62WVWb4gpzJe97xCihnn7LYW2AEICl1sy4sbW9W3aWF9A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA");
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

  const confirm = async e => {
    e.preventDefault();
    const data = { name: state.name, email: state.email };
    console.log(data);
    await axios
      .get("http://localhost:8080/users/findID", {
        params: { name: state.name, email: state.email },
      })
      .then(function (response) {
        console.log(response);
        alert("당신의 아이디는 " + response.data + " 입니다.");
        history.push("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
