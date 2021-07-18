import React from "react";
import styled from "styled-components";

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  border-width: 0.5px;
  border-style: solid;
`;

function Foot() {
  return <Footer>FOOTER!!</Footer>;
}

export default Foot;
