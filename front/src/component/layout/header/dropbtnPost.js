import React from "react";
import { Link } from "react-router-dom";


const DropbtnPost = () => {

  const role = localStorage.getItem("role");
  
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
