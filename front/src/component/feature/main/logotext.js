
import React from "react";
import styled from "styled-components";

const Navypart1 = styled.span`
margin-left : 1vw;
font-family: Noto Sans KR;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 52px;

color: #0D00A4;
`;

const Navypart2 = styled.span`

font-family: Noto Sans KR;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 52px;

color: #0D00A4;
`;

const Yellowpart = styled.span`
font-family: Noto Sans KR;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 52px;

color: yellow;
`;

const Logotext = () => {
    return (
        <span>
          <Navypart1>Let</Navypart1>
          <Yellowpart>'</Yellowpart>
          <Navypart2>sson</Navypart2>  
      </span>
    );
  };
  
  export default Logotext;