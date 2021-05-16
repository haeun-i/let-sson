import React, { useReducer, useContext } from "react";
import styled from "styled-components";
import { CounterContext } from "../../../page/stusign";

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
`;
const Stusignemail = () => {
  const { state, dispatch } = useContext(CounterContext);

  const handleChange = e => {
    dispatch({ type: "setEmail", email: e.currentTarget.value });
  };

  return (
    <Box>
      <Text>* 이메일을 입력해주세요</Text>
      <label className="stuEmail">
        <InputBox
          type="email"
          value={state.email}
          onChange={handleChange}
          name="email"
        ></InputBox>
      </label>
    </Box>
  );
};

export default Stusignemail;
