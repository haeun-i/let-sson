import React, { useContext } from "react";
import styled from "styled-components";
import { ModifyContextT } from "../../../page/mypageTedit";

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

const TeasignemailMy = () => {
  const { state, dispatch } = useContext(ModifyContextT);

  const handleChange = e => {
    dispatch({ type: "setEmail", email: e.currentTarget.value });
  };

  return (
    <Box>
      <Text>* 이메일을 입력해주세요</Text>
      <label>
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

export default TeasignemailMy;
