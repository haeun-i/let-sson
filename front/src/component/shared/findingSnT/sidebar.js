import React from "react";
import Checkage from "./sideButton/checkAge";
import Checkgender from "./sideButton/checkGender";
import CheckOnline from "./sideButton/checkOnline";
import Checkpay from "./sideButton/checkPay";
import styled from "styled-components";

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


const Sidebar = () => {
  return (
    <span>
      <Wrapper>
        <SideB>
          <Checkgender />
        </SideB>
        <SideB>
          <CheckOnline />
        </SideB>

        <SideB>
          <Checkpay />
        </SideB>
        <SideB>
          <Checkage />
        </SideB>
      </Wrapper>
    </span>
  );
};

export default Sidebar;
