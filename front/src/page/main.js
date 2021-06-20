import React from "react";
import { Link } from "react-router-dom";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import mypic from "./main_image.png";
import Logotext from "../component/feature/main/logotext";

const Mainbody = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const MainImage = styled.img`
  width: 100%;
  height: 90%;
`;
const Text2_1 = styled.span`
  position: absolute;
  width: 33px;
  height: 70px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 70px;
  /* identical to box height */

  color: #ffeb34;
  top: 39vh;
  left: 11vw;

  transform: matrix(-1, 0, 0, 1, 0, 0);
`;
const Text2_2 = styled.span`
  position: absolute;
  width: 33px;
  height: 70px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 70px;
  /* identical to box height */
  top: 39vh;
  left: 40vw;
  color: #ffeb34;

  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

const Text = styled.p`
position : absolute;
top: 41vh;
left : 15vw;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 1em;
  line-height: 35px;
  /* identical to box height */

  color: white;
`;

const Introtext = styled.span`
  margin-left: 18vw;
  padding-top : 10vh;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: #000000;
`;
const Wrap = styled.div`
  background-color: #f6f4f3;
`;

const Teabutton1 = styled.button`
margin-top : 2vh;
margin-left : 10vw;
margin-bottom : 2vh;
  width: 20vw;
  background: #373275;
  border: 1px solid #0d00a4;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 1em;
  line-height: 35px;
  /* identical to box height */

  color: #ffffff;
`;

const Teabutton2 = styled.button`
  width: 20vw;
  background: #373275;
  border: 1px solid #0d00a4;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 1em;
  line-height: 35px;

  color: #ffffff;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { person: 50 }; // 임의로 지정한 값입니다.
  }

  render() {
    return (
      <div>
            <HeadButton />
            <MainImage src={mypic} />
            <Introtext>믿음과 신뢰의 이유 있는 선택, </Introtext>
            <Text2_1>"</Text2_1>
            <Text2_2>"</Text2_2>
            <Text>
              {this.state.person}명의 회원이 이 사이트를 이용하고 있습니다.
            </Text>
            <Logotext></Logotext>
            <Link to="/teasign">
              <Teabutton1>학생 가입</Teabutton1>
            </Link>
            <Link to="/stusign">
              <Teabutton2>선생님 가입</Teabutton2>
            </Link>
      </div>
    );
  }
}

export default Main;
