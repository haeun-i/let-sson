import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 10;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const Btn = styled.button`
  background-color: #0d2538;
  color: white;
  margin-left: 0;
  height: 4.5vh;
  padding: 10px;
`;
const RightNav = ({ open }) => {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const history = useHistory();

  const myPageUrl = e => {
    if (role === "teacher") {
      history.push("/mypaget/profile");
    } else if (role === "student") {
      history.push("/mypages/profile");
    }
  };

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <Ul open={open}>
      <span>
        {role === "teacher" && (
          <li>
            <Link to="/sendpost/tea">
              <Btn>보낸내역함</Btn>
            </Link>
          </li>
        )}
        {role === "teacher" && (
          <li>
            <Link to="/recievepost/tea">
              <Btn>받은내역함</Btn>
            </Link>
          </li>
        )}
        {role === "student" && (
          <li>
            <Link to="/sendpost/stu">
              <Btn>보낸내역함</Btn>
            </Link>
          </li>
        )}
        {role === "student" && (
          <li>
            <Link to="/recievepost/stu">
              <Btn>받은내역함</Btn>
            </Link>
          </li>
        )}
      </span>
      <li>
        <Link to="/findstudent">
          <Btn>학생찾기</Btn>
        </Link>
      </li>
      <li>
        <Link to="/findteacher">
          <Btn>선생님찾기</Btn>
        </Link>
      </li>
      {user ? (
        <span>
          <li>
            <Btn onClick={myPageUrl}>마이페이지</Btn>
          </li>
          <li>
            <Btn onClick={logout}>로그아웃</Btn>
          </li>
        </span>
      ) : (
        <span>
          <li>
            <Link to="/stusign">
              <Btn>학생 회원가입</Btn>
            </Link>
          </li>
          <li>
            <Link to="/teasign">
              <Btn>선생님 회원가입</Btn>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <Btn>로그인</Btn>
            </Link>
          </li>
        </span>
      )}
    </Ul>
  );
};

export default RightNav;
