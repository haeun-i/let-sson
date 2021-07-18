import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Dropbtn from "./dropbtn";
import mypic from "./logo1.png";
import styled from "styled-components";
import "./header.css";
import DropbtnPost from "./dropbtnPost";
import Mobile from "./mobile";

const HeadButton = styled.span`
  float: right;
  display: inline-block;
  vertical-align: middle;
  justify-content: right;
  margin-right: 20px;
  @media only screen and (max-width: 797px) {

    text-align:center;
    justify-content:center;
    align-item:center;
  }
}`;

const Head = styled.header`
  width: 100%;
  padding: 1rem;
  @media only screen and (max-width: 797px) {
    height: 150px;
    text-align: center;
    justify-content: center;
    align-item: center;
  }
  @media only screen and (max-width: 480px) {
    height: 10vh;
    text-align: left;
  }
`;

const Text = styled.span`
  font-size: 12px;
`;

function HeadButtons() {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const history = useHistory();
  const [size, setSize] = useState(true);

  useEffect(() => {
    // console.log(window.innerWidth);
    if (window.innerWidth <= 480) {
      setSize(false);
    }
  }, []);

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
    <div>
      {size === true && (
        <Head>
          <span className="logoimage">
            <Link to="/">
              <button>
                <img src={mypic} alt="" />
              </button>
            </Link>
          </span>
          <Text>믿음과 신뢰의 이유있는 선택</Text>
          <HeadButton>
            <span>
              <DropbtnPost />
              <Link to="/findstudent">
                <button>학생찾기</button>
              </Link>
              <Link to="/findteacher">
                <button>선생님찾기</button>
              </Link>
            </span>
            {user ? (
              <span>
                <button onClick={myPageUrl}>마이페이지</button>
                <button onClick={logout}>로그아웃</button>
              </span>
            ) : (
              <span>
                <Dropbtn />
                <Link to="/login">
                  <button>로그인</button>
                </Link>
              </span>
            )}
          </HeadButton>
        </Head>
      )}

      {size === false && (
        <Head>
          <span className="logoimage">
            <Link to="/">
              <button>
                <img src={mypic} alt="" />
              </button>
            </Link>
            <Mobile />
          </span>
        </Head>
      )}
    </div>
  );
}

export default HeadButtons;
