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

const TeasignuniMy = () => {
  const { state, dispatch } = useContext(ModifyContextT);

  const handleChange1 = e => {
    dispatch({ type: "setUniversity", university: e.currentTarget.value });
  };

  const handleChange2 = e => {
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

export default TeasignuniMy;
