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

const Btn = styled.div`
  left: 10vw;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #463ea0;
`;

const Teasigncontact = () => {
  const { dispatch } = useContext(CounterContext);

  const handleChange = e => {
    dispatch({ type: "setIsattend", is_attend: e.currentTarget.value });
  };

  return (
    <Box>
      <Text>현재 대학에 재학중이신가요?</Text>
      <Btn>
        <input type="radio" value="재학중" onChange={handleChange}></input>{" "}
        재학중
      </Btn>
      <Btn>
        <input type="radio" value="졸업" onChange={handleChange}></input> 졸업
      </Btn>
    </Box>
  );
};

export default Teasigncontact;
