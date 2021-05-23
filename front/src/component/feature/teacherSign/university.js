import React, { useContext } from "react";
import styled from "styled-components";
import { CounterContext } from "../../../page/teasign";

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
  color: #463ea0;
`;
const Teasignuni = () => {
  const { state, dispatch } = useContext(CounterContext);

  const handleChange1 = (e) => {
    dispatch({ type: "setUniversity", university: e.currentTarget.value });
  };

  const handleChange2 = (e) => {
    dispatch({ type: "setMajor", major: e.currentTarget.value });
  };

  return (
    <Box>
      <Text>출신 대학 및 학과를 입력해주세요</Text>
      <label className="stuPassword">
        <InputBox
          type="text"
          value={state.university}
          onChange={handleChange1}
          placeholder="학교"
        ></InputBox>
      </label>
      <label className="stuPassword">
        <InputBox
          type="text"
          value={state.major}
          onChange={handleChange2}
          placeholder="학과"
        ></InputBox>
      </label>
    </Box>
  );
};

export default Teasignuni;
