import React from "react";
import SubmitT from "../component/feature/myPageTpro/submitT";
import HeadButtons from "../component/layout/header/header";
import SidebarMyPt from "../component/shared/myPageT/sidebarMyPt";
import styled from "styled-components";
import axios from "axios";
import myPback from "./successbackg.jpg";

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
`;

const Blue = styled.span`
  color: #0d00a4;
`;

const Circle1 = styled.div`
  position: absolute;
  background-image: url(https://s3-alpha-sig.figma.com/img/fcbf/2bdb/a151e666636c5620c3b5533a5cc5817c?Expires=1622419200&Signature=Hht9i4BZlUyxYnPhFgIhSElREA6PYWoxxT-MUUG-of9MxyM9ug2tG7l9jDlKXeWJHUpI3TxP6yfeXALMdRICmB0gGXEgWNvFmi1utuNON2WyZVlRktWXWrtjwjWly2Vesqcsftcp7a9kftMWvAYvyX4UyFyg~64ybgbF0-fxMj4nvgoMOtQoFKZnvMP2RADKg6VCHs0Ey-aolA7ELED09yIdEssNblxsuePYFmeI7dVIHJHT2uwddH83DARTo5etSijM6uvMEyjkvorYJCzmUp0O6BxCJ6stCycXBES4CJ0TEmu8vA~7fpaDWDQyUFkeeCyyWgxcLwikvf1McziUxQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA);
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
`;

const Circle2 = styled.div`
  position: absolute;
  background-image: url(https://s3-alpha-sig.figma.com/img/03df/c6a8/415db81c007c30d615ba33a27cb1a327?Expires=1622419200&Signature=LKlEJlvlpA2pqq0wAhdBHNa4LEjP6koZxvyeE5wnOgThtQAkCatmq0Ju3E0y4cszru-GlfDYtgcbjOGQrdWzUX0vpZ0syRHNbfkyjWunv3u0EJD2iMURua5lCHjAn1a5tBNBOeDiHflTJsyyle0gKLauZACPd3ZMJh0paBLJI8SvmLw2cToiqQ~C-8S1O4k0S2qDoVV1Rdb~5VWZdAp-sF6ytXPTrq4bSjYib1Yqa5HvnMvqiqHGzY7mH0XyJie9KyUEhhS5PSk4mdG7gVQ0MVNbDU1mD0mYnWfW37iFRoeQHG5AcEp~NKhHh8-NtJJWrKNFGMIOxiBEmuPJwpy1kg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA);
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
      files : "",
    };
    this.tmp = this.state;
  };

  getData = async () => {
    const dataT = await axios.get(
      "http://localhost:8080/teachers/teacherInfo",
    { 
      headers:{
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    }
    )
    this.setState(dataT.data.data);
}

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
    this.setState(prevState => ({ ...prevState, files : e.target.files[0] }));
  };


  savedataT = async e => {
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
      photo:this.state.photo,
      university:this.state.university,
      major:this.state.major,
      is_attend:this.state.is_attend,
      prove_image:this.state.prove_image,
    }
    const formData = new FormData();
    formData.append("file", this.state.files);

    await axios.put(
      "http://localhost:8080/teachers/modify",dataList,
      { 
        headers:{
          "X-AUTH-TOKEN": localStorage.getItem("token"),
        },
      });
      await axios.post(
        "http://localhost:8080/teachers/profileImg",formData,
        { 
          headers:{
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        });
    
  };

  returning = e => {
    this.setState(this.tmp);
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
            <Blue>선생님</Blue> 페이지
          </Text2>
          <Bar>
            <SidebarMyPt />
          </Bar>
        <Wrapper>
          선생님
          <Wrapper2>
          <div>
              프로필 사진을 첨부해주세요.
              <label className="teaProve">
                <input
                  type="file"
                  accept="image/png, image/jpg"
                  name="proveimage"
                  onChange={this.handleImage}
                ></input>
              </label>
            </div>
            <SubmitT state={this.state} handleChange={this.handleChange} />
            <Buttonfame>
              <SaveNref
                type="submit"
                onClick={() => alert("저장이 완료되었습니다.")}
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
      </form>
    );
  }
}

export default MypageTp;
