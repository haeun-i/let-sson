import React from "react";
import SubmitT from "../component/feature/myPageTpro/submitT";
import HeadButtons from "../component/layout/header/header";
import SidebarMyPt from "../component/shared/myPageT/sidebarMyPt";
import styled from "styled-components";
import axios from "axios";
import myPback from "./successbackg.jpg";
import circleImg1 from "./mypage1.jpg";
import circleImg2 from "./mypage2.jpg";
import man from "../Styles/Man.png";
import woman from "../Styles/Woman.png";

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
const Wrapper2 = styled.form`
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
  width: 200px;
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
  margin-top: 20px;
  margin-right: 0;
  width: 100%;
  height: 32px;
  padding-bottom: 0px;
  background-color: #f4f4fc;
  border: 3px solid #f4f4fc;
  box-sizing: border-box;
`;

const PrfImage = styled.div`
  display: flex;
  flex-direction: row;
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
  font-size: 12px;
`;

class MypageTp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      university: "",
      major: "",
      subject: "",
      region: "",
      career: "",
      intro: "",
      plan: "",
      files: "",
      pImage: "",
    };
    this.tmp = this.state;
  }

  getData = async () => {
    try {
      const dataT = await axios.get(
        "https://let-sson.herokuapp.com/teachers/teacherInfo",
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      );
      this.setState(dataT.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  componentDidMount() {
    this.getData();
  }
  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "name") {
      this.setState(prevState => ({ ...prevState, name: value }));
    } else if (name === "university") {
      this.setState(prevState => ({ ...prevState, university: value }));
    } else if (name === "major") {
      this.setState(prevState => ({ ...prevState, major: value }));
    } else if (name === "subject") {
      this.setState(prevState => ({ ...prevState, subject: value }));
    } else if (name === "region") {
      this.setState(prevState => ({ ...prevState, region: value }));
    } else if (name === "career") {
      this.setState(prevState => ({ ...prevState, career: value }));
    } else if (name === "intro") {
      this.setState(prevState => ({ ...prevState, intro: value }));
    } else if (name === "plan") {
      this.setState(prevState => ({ ...prevState, plan: value }));
    }
  };

  handleImage = e => {
    e.preventDefault();
    console.log(e.target.files);
    this.setState(prevState => ({ ...prevState, files: e.target.files[0] }));
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ photo: imageUrl });
    this.setState({ pImage: "n" });
  };

  profileEHandler = async e => {
    this.call = e.target.name;
    if (this.call === "default") {
      this.handleImageDefault();
    } else if (this.call === "alert") {
      await alert("저장이 완료되었습니다.");
    }
  };

  handleImageDefault = async e => {
    e.preventDefault();
    this.setState({ pImage: "d" });
    try {
      await axios.post(
        "https://let-sson.herokuapp.com/teachers/basicImg",
        {},
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error.response);
    }
    if (this.state.male === true) {
      this.setState({ photo: man });
    } else {
      this.setState({ photo: woman });
    }
  };

  savedataT = async e => {
    try {
      e.preventDefault();
      const dataList = {
        stnum: this.state.stnum,
        contact: this.state.contact,
        noncontact: this.state.noncontact,
        email: this.state.email,
        enabled: this.state.enabled,
        male: this.state.male,
        female: this.state.female,
        plan: this.state.plan,
        id: this.state.id,
        intro: this.state.intro,
        name: this.state.name,
        password: this.state.password,
        pay: parseInt(this.state.pay),
        career: this.state.career,
        region: this.state.region,
        rate: this.state.rate,
        role: this.state.role,
        subject: this.state.subject,
        tel: this.state.tel,
        username: this.state.username,
        photo: this.state.photo,
        university: this.state.university,
        major: this.state.major,
        is_attend: this.state.is_attend,
        prove_image: this.state.prove_image,
      };
      const formData = new FormData();
      formData.append("file", this.state.files);
      console.log(formData);
      console.log(this.state.pImage);
      if (this.state.pImage === "d") {
        await axios.put(
          "https://let-sson.herokuapp.com/teachers/modify",
          dataList,
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        );
        window.location.reload();
      } else if (this.state.pImage === "n") {
        await axios.put(
          "https://let-sson.herokuapp.com/teachers/modify",
          dataList,
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        );
        await axios.post(
          "https://let-sson.herokuapp.com/teachers/profileImg",
          formData,
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        );
        window.location.reload();
      } else {
        await axios.put(
          "https://let-sson.herokuapp.com/teachers/modify",
          dataList,
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  returning = e => {
    this.setState(this.tmp);
  };

  render() {
    return (
      <div>
        <HeadButtons />
        <Circle1></Circle1>
        <Circle2></Circle2>
        <Container>
          <Text1>
            Better Education<br></br>Better Life
          </Text1>
          <Text2>
            <hr color="#0D00A4" width="45px" height="10px"></hr>
            <Blue>선생님</Blue> 페이지
          </Text2>
          <Bar>
            <SidebarMyPt />
          </Bar>
          <Wrapper>
            <Wrapper2 onSubmit={this.savedataT}>
              <Box>
                <Text>프로필 사진</Text>
                <PrfImage>
                  <img
                    src={this.state.photo}
                    width="150px"
                    height="150px"
                    alt="profile"
                  />
                  <DefaultB onClick={this.profileEHandler}>
                    기본이미지로 변경
                  </DefaultB>
                </PrfImage>
                <InputBoxShort
                  type="file"
                  accept="image/png, image/jpg"
                  name="proveimage"
                  onChange={this.handleImage}
                ></InputBoxShort>
              </Box>
              <SubmitT state={this.state} handleChange={this.handleChange} />
              <Buttonfame>
                <SaveNref
                  type="submit"
                  Value="확인"
                  name="alert"
                  onClick={this.profileEHandler}
                >
                  저장하기
                </SaveNref>
                {/* <SaveNref type="refresh" onClick={this.returning}>
                되돌리기
              </SaveNref> */}
              </Buttonfame>
            </Wrapper2>
          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default MypageTp;
