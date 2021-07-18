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
`;

const Teasignintro = () => {
  const { state, dispatch } = useContext(CounterContext);

  return (
    <Box>
      <Text>프로필에 들어갈 한 줄 소개를 입력해주세요</Text>
      <label>
        <InputBox
          type="text"
          value={state.intro}
          onChange={e =>
            dispatch({ type: "setIntro", intro: e.currentTarget.value })
          }
        />
      </label>
    </Box>
  );
};

export default Teasignintro;
