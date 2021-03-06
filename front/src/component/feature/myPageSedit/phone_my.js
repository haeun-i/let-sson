import React, { useContext } from "react";
import styled from "styled-components";
import { ModifyContextS } from "../../../page/mypageSedit";
import axios from "axios";

const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5%;
  margin-right: 7%;
  background: #ffffff;
  margin-top: 10px;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #0d00a4;
`;
const InputBox = styled.input`
  border: 0.05em solid #010440;
  margin-right: 0;
  padding-bottom: 30px;
  margin-right: 0;
  width: 100%;
  height: 52px;
  padding-bottom: 0px;
  background-color: #f4f4fc;
  border: 3px solid #f4f4fc;
  box-sizing: border-box;
`;

const StusignphoneMy = () => {
  const { state, dispatch } = useContext(ModifyContextS);

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
    const check1 = await axios.get(
      `https://let-sson.herokuapp.com/students/idCheck?tel=${state.tel}`
    );
    const check2 = await axios.get(
      `https://let-sson.herokuapp.com/teachers/idCheck?tel=${state.tel}`
    );
    if (check1.data.confirm === "NO" || check2.data.confirm === "NO") {
      console.log("가입불가");
    } else {
      console.log("가입가능");
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

export default StusignphoneMy;
