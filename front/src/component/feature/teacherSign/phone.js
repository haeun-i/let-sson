import React, { useContext, } from "react";
import styled from "styled-components";
import { CounterContext } from "../../../page/teasign";
import axios from "axios";
const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3vw;
  margin-top: 30px;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  color: #463ea0;
  font-size: 1em;
`;

const InputBox = styled.input`
  border: 2px solid #463ea0;
  margin-right: 0;
  width: 50vw;
  padding-bottom: 30px;
  margin-bottom: 15px;
`;


const Teasignphone = () => {
  const { state, dispatch } = useContext(CounterContext);

  // const handleChange = e => {
  //   dispatch({ type: "setTel", tel: e.currentTarget.value });
  // };

  const handlePress = e => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      dispatch({
        type: "setTel",
        tel: e.target.value,
      });
    }
  };

  const handleClick = async e => {
    e.preventDefault();
    const check1 = await axios.get(
      `http://localhost:8080/students/idCheck?tel=${state.tel}`
    );
    const check2 = await axios.get(
      `http://localhost:8080/teachers/idCheck?tel=${state.tel}`
    );
    if (
      check1.data.confirm === "사용가능한 아이디입니다." &&
      check2.data.confirm === "사용가능한 아이디입니다."
    ) {
      alert("사용할 수 있는 전화번호입니다.");
      dispatch({ type: "setTelcheck", telCheck: "true" });
    } else {
      alert("중복으로 인하여 사용할 수 없는 전화번호입니다.");
      dispatch({ type: "setTelcheck", telCheck: "false" });
    }
  };

  return (
    <Box>
      <Text>* 휴대폰 번호를 입력해주세요 (아이디로 사용됩니다)</Text>
      <label>
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

export default Teasignphone;
