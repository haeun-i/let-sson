import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CounterContext } from "../../../page/teasign";

const Button = styled.input`
  background: white;
  width: 13%;
  height: 40px;
  border: 1px dashed #463ea0;
  margin: 1%;
  cursor: pointer;
`;

const SubjectButtonTea = ({ isclicked, handleclick, subjectName }) => {
  const [background, setBackground] = useState("white");
  const [textcolor, setTextcolor] = useState("#463ea0");

  const { state, dispatch } = useContext(CounterContext);

  useEffect(() => {
    if (state.subject === subjectName) {
      setBackground("#463ea0");
      setTextcolor("white");
    } else {
      setBackground("white");
      setTextcolor("#463ea0");
    }
  }, [isclicked, state, subjectName]);

  const handleChange = e => {
    e.preventDefault();
    if (isclicked) {
      setBackground("#463ea0");
      setTextcolor("white");
    } else {
      setBackground("white");
      setTextcolor("#463ea0");
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

export default SubjectButtonTea;
