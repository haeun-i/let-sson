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

const Stusigngender = () => {
  const { dispatch } = useContext(CounterContext);

  const handleChangeMale = e => {
    dispatch({ type: "setMale", male: true, female: false });
  };
  const handleChangeFemale = e => {
    dispatch({ type: "setFemale", male: false, female: true });
  };

  return (
    <Box>
      <Text>성별이 어떻게 되시나요?</Text>
      <Btn>
        <input
          type="radio"
          name="stugender"
          value="남성"
          onChange={handleChangeMale}
        ></input>{" "}
        남성
      </Btn>
      <Btn>
        <input
          type="radio"
          name="stugender"
          value="여성"
          onChange={handleChangeFemale}
        ></input>{" "}
        여성
      </Btn>
    </Box>
  );
};

export default Stusigngender;
