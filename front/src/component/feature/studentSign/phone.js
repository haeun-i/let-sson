import React, { useReducer, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { CounterContext } from "../../../page/stusign";

const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25%;
  margin-right: 25%;
  border-top: solid 3px #010440;
  background: white;
  margin-top: 30px;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const InputBox = styled.input`
  border: 0.05em solid #010440;
  margin-right: 0;
  width: 55%;
  padding-right: 40%;
  padding-bottom: 30px;
`;

const Stusignphone = () => {
  const { state, dispatch } = useContext(CounterContext);

  const handlePress = e => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      dispatch({
        type: "setTel",
        tel: e.target.value,
      });
    }
  };

  // const handleChange = (e) => {
  //   dispatch({ type: "setTel", tel: e.currentTarget.value });
  // };

  const handleClick = async e => {
    e.preventDefault();
    const check1 = await axios.get(
      `http://localhost:8080/students/idCheck?tel=${state.tel}`
    );
    const check2 = await axios.get(
      `http://localhost:8080/teachers/idCheck?tel=${state.tel}`
    );
    if(check1.data.confirm === "사용가능한 아이디입니다." && check2.data.confirm === "사용가능한 아이디입니다."){
      alert("사용할 수 있는 전화번호입니다.");
      dispatch({ type: "setTelcheck", telCheck : "true" });
    }else {
      alert("중복으로 인하여 사용할 수 없는 전화번호입니다.");
      dispatch({ type: "setTelcheck", telCheck : "false" });
    }
  };

  return (
    <Box>
      <Text>* 휴대폰 번호를 입력해주세요 (아이디로 사용됩니다)</Text>
      <label className="stuTel">
        <InputBox
          type="tel"
          name="tel"
          value={state.tel}
          onChange={handlePress}
        ></InputBox>
        <button onClick={handleClick}>중복체크</button>
      </label>
    </Box>
  );
};

export default Stusignphone;
