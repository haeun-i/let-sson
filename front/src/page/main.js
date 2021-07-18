import React from "react";
import { Link } from "react-router-dom";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import mypic from "./main_image.png";
import axios from "axios";
import Logotext from "../component/feature/main/logotext";

const Mainbody = styled.div`
  overflow: hidden;
`;

const Btnspan = styled.span`
  white-space: nowrap;
  @media only screen and (max-width: 1250px) {
    margin-left: 18vw;
  }
`;

const Textspan = styled.span`
  white-space: nowrap;
  @media only screen and (max-width: 1250px) {
    margin-left: 15vw;
  }
  @media only screen and (max-width: 970px) {
    margin-left: 14vw;
  }
  @media only screen and (max-width: 900px) {
    margin-left: 13vw;
  }
  @media only screen and (max-width: 850px) {
    margin-left: 12vw;
  }
  @media only screen and (max-width: 800px) {
    margin-left: 11vw;
  }
  @media only screen and (max-width: 750px) {
    margin-left: 10vw;
  }
  @media only screen and (max-width: 700px) {
    margin-left: 9vw;
  }
  @media only screen and (max-width: 650px) {
    margin-left: 8vw;
  }
  @media only screen and (max-width: 600px) {
    margin-left: 7vw;
  }
  @media only screen and (max-width: 550px) {
    margin-left: 6vw;
  }
  @media only screen and (max-width: 500px) {
    margin-left: 5vw;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 90%;
  position: relative;
`;
const Text21 = styled.span`
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

  @media all and (max-width: 1250px), (max-height: 300px) {
    display: none;
  }

  transform: matrix(-1, 0, 0, 1, 0, 0);
`;
const Text22 = styled.span`
  position: absolute;
  width: 33px;
  height: 70px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 70px;
  left: 35vw;
  top: 39vh;
  color: #ffeb34;

  @media all and (max-width: 1500px) {
    left: 40vw;
  }
  @media all and (max-width: 1250px), (max-height: 300px) {
    display: none;
  }

  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

const Text = styled.p`
  position: absolute;
  top: 41vh;
  left: 15vw;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 1em;
  line-height: 35px;
  /* identical to box height */

  @media only screen and (max-height: 500px) {
    top: 49vh;
  }

  @media only screen and (max-width: 800px) {
    top: 53vh;
  }

  @media only screen and (max-width: 600px), (max-height: 450px) {
    display: none;
  }

  @media only screen and (max-width: 800px) and (max-height: 450px) {
    top: 59vh;
  }

  @media only screen and (max-height: 400px) {
    display: none;
  }

  @media all and (max-width: 490px) and (max-height: 500px) {
    display: none;
  }

  color: white;
`;

const Introtext = styled.span`
  margin-left: 18vw;
  padding-top: 10vh;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: #000000;
`;

const Teabutton1 = styled.button`
  margin-top: 2vh;
  margin-left: 10vw;
  margin-bottom: 2vh;
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

  // getData = async () => {
  //   try {
  //     const dataS = await axios.get(
  //       "http://localhost:8080/students/studentInfo",
  //       {
  //         headers: {
  //           "X-AUTH-TOKEN": localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     this.setState(dataS.data.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }

  componentDidMount() {
    axios
      .get("https://let-sson.herokuapp.com/users/totalNumber")
      .then(res => {
        this.setState({ person: res.data });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <Mainbody>
        <HeadButton />
        <MainImage src={mypic} />
        <Text21>"</Text21>
        <Text22>"</Text22>
        <Text>
          {this.state.person}명의 회원이 이 사이트를 이용하고 있습니다.
        </Text>
        <Textspan>
          <Introtext>믿음과 신뢰의 이유 있는 선택, </Introtext>
          <Logotext></Logotext>
        </Textspan>
        <Btnspan>
          <Link to="/stusign">
            <Teabutton1>학생 가입</Teabutton1>
          </Link>
          <Link to="/teasign">
            <Teabutton2>선생님 가입</Teabutton2>
          </Link>
        </Btnspan>
      </Mainbody>
    );
  }
}

export default Main;
