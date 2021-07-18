import React from "react";
import styled from "styled-components";

const Div = styled.div`
  @media only screen and (max-width: 820px), (max-height: 700px) {
    margin-top: 15vh;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 0;
  }
`;
const Navypart1 = styled.span`
  position: absolute;
  top: 20vh;
  left: 45vw;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 52px;

  color: #0d00a4;

  @media only screen and (max-height: 450px) {
    display: none;
  }

  @media only screen and (max-width: 1000px) {
    left: 40vw;
  }

  @media only screen and (max-width: 750px) {
    top : 27vh;
    left: 38vw;
  }
  @media only screen and (max-width: 610px) {
    top : 27vh;
    left: 36vw;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    top: 15vh;
    left: 31vw;
  }
  @media only screen and (max-height: 700px) {
    margin-top: 20vh;
  }
`;

const Navypart2 = styled.span`
  top: 20vh;
  left: 50.5vw;
  position: absolute;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 52px;

  color: #0d00a4;
  @media (min-width: 320px) and (max-width: 480px) {
    top: 15vh;
  }

  @media only screen and (max-height: 450px) {
    display: none;
  }
  @media only screen and (max-width: 1000px) {
    left: 48vw;
  }
  @media only screen and (max-width: 750px) {
    left: 47vw;
    top : 27vh;
  }

  @media only screen and (max-height: 700px) {
    margin-top: 20vh;
  }
`;

const Yellowpart = styled.span`
  position: absolute;
  top: 20vh;
  left: 49.5vw;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 52px;

  color: yellow;
  @media (min-width: 320px) and (max-width: 480px) {
    top: 15vh;
  }

  @media only screen and (max-height: 450px) {
    display: none;
  }
  @media only screen and (max-width: 1000px) {
    left: 46.5vw;
  }
  @media only screen and (max-width: 750px) {
    top : 27vh;
    left: 45.5vw;
  }
  @media only screen and (max-height: 700px) {
    margin-top: 20vh;
  }
`;

const Signlogotext = () => {
  return (
    <Div>
      <Navypart1>Let</Navypart1>
      <Yellowpart>'</Yellowpart>
      <Navypart2>sson</Navypart2>
    </Div>
  );
};

export default Signlogotext;
