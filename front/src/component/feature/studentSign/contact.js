import React, { useContext } from "react";
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

const Btn = styled.div`
  left: 10vw;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #463ea0;
`;

const Stusigncontact = () => {
  const { dispatch } = useContext(CounterContext);

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
        ></input>{" "}
        예
      </Btn>
      <Btn>
        <input
          type="radio"
          name="contact"
          value="아니오"
          onChange={handleChangeN}
        ></input>{" "}
        아니오
      </Btn>
    </Box>
  );
};

export default Stusigncontact;
