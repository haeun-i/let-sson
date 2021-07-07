import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid white;
  display: flex;
  position: absolute;
  width: 40%;
  background-color: white;
  height: 36px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(237, 237, 237, 0.25);
  border-radius: 3px;
  justify-content: center;
`;

const SideB = styled.button`
  font-size: 15px;
  border: solid 1px #e8e8e8;
  padding: 10px;
  width: 150px;
  height: 36px;
  margin: 0;
`;

const SidebarMyP = () => {
  
  const history = useHistory();
  const withdraw = (e) => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      axios.delete("http://localhost:8080/teachers/delete", {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("token"),
        },
      }).then((res) => {
        alert("계정이 탈퇴되었습니다."); 
        localStorage.removeItem("token");
        history.push("/login");   
     })
     .catch((err) => {
       console.log(err.response);
     });
    }
  };

  return (
    <div>
      <Wrapper>
        <Link to="/mypaget/profile">
          <SideB>프로필 작성</SideB>
        </Link>
        <Link to="/mypaget/edit">
          <SideB>수정하기</SideB>
        </Link>
        <Link>
        <SideB onClick={withdraw}>탈퇴하기</SideB>
        </Link>
      </Wrapper>
    </div>
  );
};

export default SidebarMyP;
