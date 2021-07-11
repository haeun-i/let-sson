import React, { useContext } from "react";
import styled from "styled-components";
import { ModifyContextS } from "../../../page/mypageSedit";

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
  line-height: 20px;
  color: #0d00a4;
  font-size: 14px;
`;

const Btn = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const StusignisstuMy = () => {
  const { state, dispatch } = useContext(ModifyContextS);

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
          checked={state.is_stu === "학생" ? true : false}
        ></input>{" "}
        학생
      </Btn>
      <Btn>
        <input
          type="radio"
          name="isstu"
          value="학부모"
          onChange={Changed}
          checked={state.is_stu === "학부모" ? true : false}
        ></input>{" "}
        학부모
      </Btn>
    </Box>
  );
};

export default StusignisstuMy;
