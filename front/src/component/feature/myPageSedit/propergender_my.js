import React, { useReducer, useContext } from "react";
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
  line-height: 20px;
  color: #0d00a4;
  font-size: 14px;
`;

const Btn = styled.div`
  margin-top: 10px;
  font-size: 14px;
  margin-bottom: 10px;
`;
const StusignpropergenderMy = () => {
  const { state, dispatch } = useContext(ModifyContextS);

  const handleChange = e => {
    dispatch({ type: "setPropergender", proper_gender: e.currentTarget.value });
  };

  return (
    <Box>
      <Text>선호하는 선생님의 성별이 어떻게 되시나요?</Text>
      <Btn>
        <input
          type="radio"
          name="stupropergender"
          value="남성"
          onChange={handleChange}
          checked={state.proper_gender === "남성" ? true : false}
        ></input>{" "}
        남성
      </Btn>
      <Btn>
        <input
          type="radio"
          name="stupropergender"
          value="여성"
          onChange={handleChange}
          checked={state.proper_gender === "여성" ? true : false}
        ></input>{" "}
        여성
      </Btn>
    </Box>
  );
};

export default StusignpropergenderMy;
