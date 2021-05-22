import React, { useReducer, useContext } from "react";
import styled from "styled-components";
import { ModifyContextS } from "../../../page/mypageSedit";

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

const Btn = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
`;

const StusignpayMy = () => {
  const { state, dispatch } = useContext(ModifyContextS);

  const handleChange = e => {
    dispatch({ type: "setPay", pay: e.currentTarget.value });
  };

  return (
    <Box>
      <Text>과외비의 예산이 어떻게 되시나요? (1달 수업 기준)</Text>
      <label className="stuJen">
        <Btn>
          <input
            type="radio"
            name="pay"
            value="10"
            onChange={handleChange}
            checked={state.pay === 10 ? true : false}
          ></input>{" "}
          10만원 대
        </Btn>
        <Btn>
          <input
            type="radio"
            name="pay"
            value="20"
            onChange={handleChange}
            checked={state.pay === 20 ? true : false}
          ></input>{" "}
          20만원 대
        </Btn>
        <Btn>
          <input
            type="radio"
            name="pay"
            value="30"
            onChange={handleChange}
            checked={state.pay === 30 ? true : false}
          ></input>{" "}
          30만원 대
        </Btn>
        <Btn>
          <input
            type="radio"
            name="pay"
            value="40"
            onChange={handleChange}
            checked={state.pay === 40 ? true : false}
          ></input>{" "}
          40만원 대
        </Btn>
        <Btn>
          <input
            type="radio"
            name="pay"
            value="50"
            onChange={handleChange}
            checked={state.pay === 50 ? true : false}
          ></input>{" "}
          그 이상
        </Btn>
      </label>
    </Box>
  );
};

export default StusignpayMy;
