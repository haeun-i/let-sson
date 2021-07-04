import React, { useState } from "react";
import HeadButtons from "../component/layout/header/header";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RegisS from "../component/feature/registerStu/regisS";
import axios from "axios";
import backI from "./successbackg.jpg";

const Wrapper = styled.div`
  background: url(${backI});
  background-size: cover;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
`;
const SubmitB = styled.button`
  position: absolute;
  background-position: center;
  background-size: cover;
  margin-top: 10%;
  margin-left: 9%;
  text-align: center;
  line-height: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
`;

const Buttonfame = styled.div`
  margin-top: 50px;
  height: 200px;
  width: 200px;
`;

const Registerstu = props => {
  // history
  const [data, setData] = useState({
    id: props.location.state.id,
    name: props.location.state.name,
    subject: props.location.state.subject,
    region: props.location.state.region,
    intro: props.location.state.intro,
    goal: props.location.state.goal,
    tel: props.location.state.tel,
  });

  const stuPost = async e => {
    console.log(data.tel);

    await axios
      .post(
        `http://localhost:8080/teachers/sendProfile?student_tel=${data.tel}`,
        {
          student_tel: data.tel,
        },
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      )
      .then(response => {
        alert("신청이 완료되었습니다.");
      })
      .catch(error => {
        console.log("전송 실패");
        console.log(error.response);
      });
  };

  return (
    <div>
      <HeadButtons />
      <Wrapper>
        <RegisS
          id={data.id}
          name={data.name}
          subject={data.subject}
          region={data.region}
          intro={data.intro}
          goal={data.goal}
        />
        <Buttonfame>
          <Link to="/findstudent">
            <SubmitB onClick={stuPost}>신청하기</SubmitB>
          </Link>
        </Buttonfame>
      </Wrapper>
    </div>
  );
};

export default Registerstu;
