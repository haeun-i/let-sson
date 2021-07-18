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

const Stusignisstu = () => {
  const { dispatch } = useContext(CounterContext);

  const Changed = e => {
    dispatch({ type: "setIsstu", is_stu: e.currentTarget.value });
  };
  return (
    <Box>
      <Text>학생이신가요?</Text>
      <Btn>
        <input
          type="radio"
          name="isstu"
          value="학생"
          onChange={Changed}
        ></input>{" "}
        학생
      </Btn>
      <Btn>
        <input
          type="radio"
          name="isstu"
          value="학부모"
          onChange={Changed}
        ></input>{" "}
        학부모
      </Btn>
    </Box>
  );
};

export default Stusignisstu;
