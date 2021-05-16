
import React from "react";
import styled from "styled-components";

const Navypart1 = styled.span`
position: absolute;
top : 103vh;
left : 32vw;
font-family: Noto Sans KR;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 52px;

color: #0D00A4;
`;

const Navypart2 = styled.span`
top : 103vh;
left : 37.5vw;
position: absolute;

font-family: Noto Sans KR;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 52px;

color: #0D00A4;
`;

const Yellowpart = styled.span`
position: absolute;
top : 103vh;
left : 36.5vw;
font-family: Noto Sans KR;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 52px;

color: yellow;
`;

const Logotext = () => {
    return (
        <div>
          <Navypart1>Let</Navypart1>
          <Yellowpart>'</Yellowpart>
          <Navypart2>sson</Navypart2>  
      </div>
    );
  };
  
  export default Logotext;