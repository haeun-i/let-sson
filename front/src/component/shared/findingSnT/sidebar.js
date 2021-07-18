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
  @media screen and (max-width: 1350px) {
    justify-content: center;
    display: flex;
    margin-left: 325px;
    margin-right: 325px;
    float: left;
  }
  @media only screen and (max-width: 1350px) {
    width: ${props => (props.span ? (props.span / 12) * 100 : "70")}%;
    margin-left: ${props => (props.span ? (props.span / 12) * 100 : "17.5")}%;
    margin-right: ${props => (props.span ? (props.span / 12) * 100 : "17.5")}%;
  }
`;

const SideB = styled.div`
  background-color: #463ea0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 10px;
  font-weight: bold;
  color: #f3f2fc;
  @media screen and (max-width: 1350px) {
    width: 500px;
  }
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
