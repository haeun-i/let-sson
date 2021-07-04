import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ModifyContextS } from "../../../page/mypageSedit";

const Button = styled.input`
  background: white;
  width: 13%;
  height: 40px;
  border: 1px dashed #f3f2fc;
  margin: 1%;
  cursor: pointer;
`;

const SubjectButtonStdMy = ({ isclicked, handleclick, subjectName }) => {
  const [background, setBackground] = useState("white");
  const [textcolor, setTextcolor] = useState("black");

  const { state, dispatch } = useContext(ModifyContextS);

  useEffect(() => {
    if (state.subject === subjectName) {
      setBackground("#010440");
      setTextcolor("white");
    } else {
      setBackground("white");
      setTextcolor("#010440");
    }
  }, [isclicked, state]);

  const handleChange = e => {
    e.preventDefault();
    if (isclicked) {
      setBackground("#f3f2fc");
      setTextcolor("white");
    } else {
      setBackground("white");
      setTextcolor("#010440");
    }
    handleclick();
    dispatch({ type: "setSubject", subject: e.currentTarget.value });
  };
  return (
    <Button
      type="button"
      name="subject"
      style={{ backgroundColor: background, color: textcolor }}
      onClick={handleChange}
      value={subjectName}
    ></Button>
  );
};

export default SubjectButtonStdMy;
