import React from "react";
///import { Link } from "react-router-dom";
import SubmitS from "../component/feature/myPageSpro/submitS";
import HeadButtons from "../component/layout/header/header";
import SidebarMyPs from "../component/shared/myPageS/sidebarMyPs";
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
    };
    this.tmp = this.state;
  };
  
    getData = async () => {
        const dataS = await axios.get(
          "http://localhost:8080/students/studentInfo",
        { 
          headers:{
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
        )
        this.setState(dataS.data.data);
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
    e.preventDefault();
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
    }
    console.log(dataList);
    await axios.put(
      "http://localhost:8080/students/modify",dataList,
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
        <SidebarMyPs />
        <Wrapper>
          학생
          <Wrapper2>
            <SubmitS state={this.state} handleChange={this.handleChange} />
            <Buttonfame>
              <SaveNref type="submit" value="확인" onClick={() => alert("저장이 완료되었습니다.")}>
                저장하기
              </SaveNref>
              <SaveNref name="refresh" onClick={this.returning}>
                되돌리기
              </SaveNref>
            </Buttonfame>
          </Wrapper2>
        </Wrapper>
      </form>
    );
  }
}

export default MypageSp;
