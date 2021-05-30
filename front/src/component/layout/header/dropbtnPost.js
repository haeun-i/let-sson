import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
background: inherit ; 
border:none; 
box-shadow:none; 
border-radius:0; 
padding:0; 
margin : 0;
overflow:visible; 
cursor:pointer;
size : 0;
`

const DropbtnPost = () => {

  const role = localStorage.getItem("role");
  const history = useHistory();
  
    return (
      <div className="dropdown">
        <button className="dropbtn">내역함</button>
        <div className="dropdown-content">
        {role === "teacher" && (
        <Link to="/sendpost/tea">보낸내역함</Link>
         )}
        {role === "student" && (
        <Link to="/sendpost/stu">보낸내역함</Link>
         )}
        {role === "teacher" && (
        <Link to="/recievepost/tea">받은내역함</Link>
         )}
        {role === "student" && (
        <Link to="/recievepost/stu">받은내역함</Link>
         )}
        </div>
      </div>
    );
}

export default DropbtnPost;
