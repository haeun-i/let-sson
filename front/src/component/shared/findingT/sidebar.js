import React from "react";
import styled from "styled-components";
import CheckageT from "./sideButton/checkAge";
import CheckgenderT from "./sideButton/checkGender";
import CheckOnlineT from "./sideButton/checkOnline";
import CheckpayT from "./sideButton/checkPay";

const Wrapper = styled.div`
  margin: 5px;
  float: right;
  width: 250px;
  box-sizing: border-box;
  display: grid;
  background-color: #463ea0;
  border-radius: 10px;
  positon: flow;
`;

const SideB = styled.div`
  background-color: #463ea0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 10px;
  font-weight: bold;
  color: #f3f2fc;
`;


const SidebarT = () => {
  return (
    <span>
      <Wrapper>
        <SideB>
          <CheckgenderT />
        </SideB>
        <SideB>
          <CheckOnlineT />
        </SideB>
        <SideB>
          <CheckpayT />
        </SideB>
      </Wrapper>
    </span>
  );
};

export default SidebarT;
