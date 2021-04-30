import React from "react";
import SubmitT from "../component/feature/myPageTpro/submitT";
import HeadButtons from "../component/layout/header/header";
import SidebarMyPt from "../component/shared/myPageT/sidebarMyPt";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f6f4f3;
`;
const SaveNref = styled.button`
  height: 45px;
  width: 100px;
  border-top: solid 3px #010440;
  border-left: none;
  border-right: none;
  border-bottom: none;
  background-color: white;
  font-size: 16px;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
`;

const Buttonfame = styled.div`
  margin-left: 50%;
  margin-top: 20px;
`;

const Wrapper2 = styled.div`
  width: 85%;
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
    console.log(dataList);
    await axios.put(
      "http://localhost:8080/teachers/modify",dataList,
      { 
        headers:{
          "X-AUTH-TOKEN": localStorage.getItem("token"),
        },
      }
    ).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  };

  returning = e => {
    this.setState(this.tmp);
  };

  render() {
    return (
      <form onSubmit={this.savedataT}>
        <HeadButtons />
        <SidebarMyPt />
        <Wrapper>
          선생님
          <Wrapper2>
            <SubmitT state={this.state} handleChange={this.handleChange} />
            <Buttonfame>
              <SaveNref
                type="submit"
                onClick={() => alert("저장이 완료되었습니다.")}
              >
                저장하기
              </SaveNref>
              <SaveNref type="refresh" onClick={this.returning}>
                되돌리기
              </SaveNref>
            </Buttonfame>
          </Wrapper2>
        </Wrapper>
      </form>
    );
  }
}

export default MypageTp;
