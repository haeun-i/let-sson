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

const Teasignpay = () => {
  const { dispatch } = useContext(CounterContext);

  const handleChange = e => {
    dispatch({ type: "setPay", pay: e.currentTarget.value });
  };

  return (
    <Box>
      <Text>원하시는 과외비가 얼마인가요? (1달 수업 기준)</Text>
      <label className="stuJen">
        <Btn>
          <input
            type="radio"
            name="pay"
            value="10"
            onChange={handleChange}
          ></input>{" "}
          10만원 대
        </Btn>
        <Btn>
          <input
            type="radio"
            name="pay"
            value="20"
            onChange={handleChange}
          ></input>{" "}
          20만원 대
        </Btn>
        <Btn>
          <input
            type="radio"
            name="pay"
            value="30"
            onChange={handleChange}
          ></input>{" "}
          30만원 대
        </Btn>
        <Btn>
          <input
            type="radio"
            name="pay"
            value="40"
            onChange={handleChange}
          ></input>{" "}
          40만원 대
        </Btn>
        <Btn>
          <input
            type="radio"
            name="pay"
            value="50"
            onChange={handleChange}
          ></input>{" "}
          그 이상
        </Btn>
      </label>
    </Box>
  );
};

export default Teasignpay;
