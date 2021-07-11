import React from "react";
import { Link } from "react-router-dom"
import SubmitS from "../component/feature/myPageSpro/submitS";
import HeadButtons from "../component/layout/header/header";
import SidebarMyPs from "../component/shared/myPageS/sidebarMyPs";
import styled from "styled-components";
import axios from "axios";
import myPback from "./successbackg.jpg";
import circleImg1 from "./mypage1.jpg";
import circleImg2 from "./mypage2.jpg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url(${myPback});
  background-size: contain;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const SaveNref = styled.button`
  height: 50px;
  background: #463ea0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-top: 5px;
  margin-bottom: 40px;
  margin-left: 50px;
  margin-right: 50px;
  color: white;
  border: 0;
  outline: 1;
`;

const Buttonfame = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const Wrapper2 = styled.div`
  width: 50%;
  background: #ffffff;
  border: 1px solid #f3f2fc;
  box-sizing: border-box;
  @media only screen and (max-width: 770px) {
    width: 85%;
  }
`;

const Blue = styled.span`
  color: #0d00a4;
`;

const Circle1 = styled.div`
  position: absolute;
  background-image: url(${circleImg1});
  background-position: center;
  background-size: cover;
  margin-top: 25%;
  margin-left: 79%;
  text-align: center;
  line-height: 200px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  font-weight: bold;
  font-weight: bold;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
  @media only screen and (max-width: 1350px) {
    width: ${props => (props.span ? (props.span / 12) * 100 : "15")}%;
  }
  @media only screen and (max-width: 1350px) {
    width: ${props => (props.span ? (props.span / 12) * 100 : "15")}%;
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const Circle2 = styled.div`
  position: absolute;
  background-image: url(${circleImg2});
  background-position: center;
  background-size: cover;
  margin-top: 10%;
  margin-left: 9%;
  text-align: center;
  line-height: 200px;
  box-shadow: -90px -90px #f3f2fc;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
  @media only screen and (max-width: 1350px) {
    width: ${props => (props.span ? (props.span / 12) * 100 : "15")}%;
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const Text1 = styled.div`
  position: absolute;
  margin-left: 10%;
  margin-right: 60%;
  padding-top: 30%;
  padding-bottom: 50px;
  color: #0d00a4;
  @media only screen and (max-width: 1350px) {
    width: 0%;
    padding-top: 33%;
  }
  @media only screen and (max-width: 770px) {
    display: none;
  }
`;
const Text2 = styled.div`
  margin-left: 25%;
  margin-right: 60%;
  padding-top: 50px;
  padding-bottom: 50px;
`;
const Bar = styled.div`
  margin-left: 30%;
  margin-right: 50%;
  margin-bottom: 100px;
`;

const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5%;
  margin-right: 7%;
  background: #ffffff;
  margin-top: 10px;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #0d00a4;
`;

const InputBoxShort = styled.input`
  margin-top:20px;
  margin-right: 0;
  width: 100%;
  height: 32px;
  padding-bottom: 0px;
  background-color: #f4f4fc;
  border: 3px solid #f4f4fc;
  box-sizing: border-box;
`;

const PrfImage = styled.div`
  display:flex;
  flex-direction:row;
`;


const DefaultB = styled.button`
  height: 50px;
  width: 90px;
  background: #463ea0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-top: 100px;
  color: white;
  border: 0;
  outline: 1;
  font-size:12px;
`
class MypageSp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      subject: "",
      region: "",
      review: "",
      intro: "",
      goal: "",
      files: "",
      pImage:"",
    };
    this.tmp = this.state;
  }

  getData = async () => {
    try {
      const dataS = await axios.get(
        "http://localhost:8080/students/studentInfo",
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      );
      this.setState(dataS.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  handleImage = e => {
    e.preventDefault();
    console.log(e.target.files);
    this.setState(prevState => ({ ...prevState, files: e.target.files[0] }));
    this.state.pImage = "n"
  };

  handleImageDefault = async e =>{
    this.state.pImage = "d"
    try{
      await axios
        .post("http://localhost:8080/students/basicImg",{}, {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        });
        window.location.reload();
      }catch(error){
        console.log(error.response);
      }
  }

  componentDidMount() {
    this.getData();
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "name") {
      this.setState(prevState => ({ ...prevState, name: value }));
    } else if (name === "subject") {
      this.setState(prevState => ({ ...prevState, subject: value }));
    } else if (name === "region") {
      this.setState(prevState => ({ ...prevState, region: value }));
    } else if (name === "review") {
      this.setState(prevState => ({ ...prevState, review: value }));
    } else if (name === "intro") {
      this.setState(prevState => ({ ...prevState, intro: value }));
    } else if (name === "goal") {
      this.setState(prevState => ({ ...prevState, goal: value }));
    }
  };

  savedataT = async e => {
    try{e.preventDefault();
      const dataList = {
        age: parseInt(this.state.age),
        contact: this.state.contact,
        noncontact: this.state.noncontact,
        email: this.state.email,
        male: this.state.male,
        female: this.state.female,
        goal: this.state.goal,
        id: this.state.id,
        intro: this.state.intro,
        is_stu: this.state.is_stu,
        name: this.state.name,
        password: this.state.password,
        pay: parseInt(this.state.pay),
        proper_gender: this.state.proper_gender,
        region: this.state.region,
        review: this.state.review,
        role: this.state.role,
        subject: this.state.subject,
        tel: this.state.tel,
        username: this.state.username,
        enabled: this.state.enabled,
        photo:this.state.photo,
      };
      console.log(dataList);
      const formData = new FormData();
      formData.append("file", this.state.files);
      console.log(formData);
      console.log(this.state.pImage);
      if (this.state.pImage === "d"){
        await axios
          .put("http://localhost:8080/students/modify", dataList, {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          });
        }else{
        await axios
          .put("http://localhost:8080/students/modify", dataList, {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          });
        await axios
          .post("http://localhost:8080/students/profileImg", formData, {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          });
        };
        window.location.reload();
      }
        catch(error) {
          console.log(error.response);
        }
  };

  render() {
    return (
      <form onSubmit={this.savedataT}>
        <HeadButtons />
        <Circle1></Circle1>
        <Circle2></Circle2>
        <Container>
          <Text1>
            Better Education<br></br>Better Life
          </Text1>
          <Text2>
            <hr color="#0D00A4" width="45px" height="10px"></hr>
            <Blue>학생</Blue> 페이지
          </Text2>
          <Bar>
            <SidebarMyPs />
          </Bar>
          <Wrapper>
            <Wrapper2>
              <Box>
                <Text>프로필 사진</Text>
                <PrfImage>
                <img src={this.state.photo} width="150px" height="150px"/>
                <DefaultB onClick={this.handleImageDefault}>기본이미지로 변경</DefaultB>
                </PrfImage>
                <InputBoxShort
                  type="file"
                  accept="image/png, image/jpg"
                  name="proveimage"
                  onChange={this.handleImage}
                ></InputBoxShort>
              </Box>
              <SubmitS state={this.state} handleChange={this.handleChange} />
              <Buttonfame>
                <SaveNref
                  type="submit"
                  Value="확인"
                  onSubmit={() => alert("저장이 완료되었습니다.")}
                >
                  저장하기
                </SaveNref>
                {/* <SaveNref name="refresh" onClick={this.returning}>
                  되돌리기
                </SaveNref> */}
              </Buttonfame>
            </Wrapper2>
          </Wrapper>
        </Container>
      </form>
    );
  }
}

export default MypageSp;
