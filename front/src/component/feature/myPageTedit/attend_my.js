import React, { useContext } from "react";
import styled from "styled-components";
import { ModifyContext, ModifyContextT } from "../../../page/mypageTedit";

const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
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


const Btn = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TeasignattendMy = () => {
  const { state, dispatch } = useContext(ModifyContextT);

  const handleChange = (e) => {
    dispatch({ type: "setIsattend", is_attend: e.currentTarget.value });
  };

  return (
    <Box>
      <Text>현재 대학에 재학중이신가요?</Text>
      <Btn>
        <input
          type="radio"
          value="재학중"
          onChange={handleChange}
          checked={state.is_attend === "재학중" ? true : false}
        ></input>{" "}
        재학중
      </Btn>
      <Btn>
        <input
          type="radio"
          value="졸업"
          onChange={handleChange}
          checked={state.is_attend === "졸업" ? true : false}
        ></input>{" "}
        졸업
      </Btn>
    </Box>
  );
};

export default TeasignattendMy;
