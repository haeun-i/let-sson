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

const Teasignname = () => {
  const { state, dispatch } = useContext(CounterContext);

  return (
    <Box>
      <Text> * 이름 혹은 별명을 입력해주세요</Text>
      <label>
        <InputBox
          type="text"
          value={state.name}
          onChange={e =>
            dispatch({ type: "setName", name: e.currentTarget.value })
          }
        />
      </label>
    </Box>
  );
};

export default Teasignname;
