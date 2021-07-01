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
  line-height: 20px;
  font-size: 14px;
  color: #0d00a4;
`;

const Btn = styled.div`
  margin-top: 10px;
  font-size: 14px;
  margin-bottom: 10px;
`;

const StusigncontactMy = () => {
  const { state, dispatch } = useContext(ModifyContextS);

  const handleChangeC = e => {
    dispatch({ type: "setContact", contact: true, noncontact: false });
  };
  const handleChangeN = e => {
    dispatch({ type: "setNoncontact", contact: false, noncontact: true });
  };

  return (
    <Box>
      <Text>화상강의가 가능한 수업을 원하시나요?</Text>
      <Btn>
        <input
          type="radio"
          name="contact"
          value="예"
          onChange={handleChangeC}
          checked={state.contact === true ? true : false}
        ></input>{" "}
        예
      </Btn>
      <Btn>
        <input
          type="radio"
          name="contact"
          value="아니오"
          onChange={handleChangeN}
          checked={state.noncontact === true ? true : false}
        ></input>{" "}
        아니오
      </Btn>
    </Box>
  );
};

export default StusigncontactMy;
