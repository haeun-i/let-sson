import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid white;
  display: flex;
  position: absolute;
  width: 49%;
  background-color: white;
  height: 36px;
  background: none;
  box-shadow: 0px 4px 4px rgba(237, 237, 237, 0.25);
  border-radius: 3px;
  justify-content: center;
`;

const SideB = styled.button`
  font-size: 15px;
  border: solid 1px #e8e8e8;
  padding: 10px;
  width: 120px;
  height: 36px;
  margin: 0;
`;

const Btn = styled.button`
  font-size: 15px;
  border: solid 1px #e8e8e8;
  padding: 10px;
  width: 120px;
  height: 36px;
  margin: 0;
`;

const SidebarMyPs = () => {
  const history = useHistory();

  const onclickEHandler = e => {
    const name = e.target.name;
    if (name === "delete") {
      withdraw();
    }
  };
  const withdraw = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      await axios
        .delete("https://let-sson.herokuapp.com/students/delete", {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        })
        .then(res => {
          localStorage.removeItem("token");
          alert("계정이 탈퇴되었습니다.");
          history.push("/login");
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  };
  return (
    <div>
      <Wrapper>
        <Link to="/mypages/profile">
          <SideB>프로필 작성</SideB>
        </Link>
        <Link to="/mypages/edit">
          <SideB>수정하기</SideB>
        </Link>
        <span>
          <Btn name="delete" onClick={onclickEHandler}>
            탈퇴하기
          </Btn>
        </span>
      </Wrapper>
    </div>
  );
};

export default SidebarMyPs;
