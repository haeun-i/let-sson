import React, { useState } from "react";
import styled from "styled-components";
import SubjectButtonTeaMy from "./SubjectButtonTeaMy";

const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5%;
  margin-right: 7%;
  background: #ffffff;
  margin-top: 10px;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #0d00a4;
`;


const ButtonContainer = styled.div`
  margin-left: 3%;
`;

const TeasignsubjectMy = () => {
  const subjectNames = [
    "국어",
    "영어",
    "사회",
    "수학",
    "과학",
    "자격증",
    "레슨",
    "프로그래밍",
    "자소서",
    "논술",
    "회화",
    "면접",
  ];
  const [isclicked, setClicked] = useState(false);

  const handleclick = () => {
    setClicked(prestate => !prestate);
  };

  return (
    <Box>
      <Text>어떤 과목의 선생님이신가요?</Text>
      <ButtonContainer>
        {subjectNames.map((subjectName, index) => (
          <SubjectButtonTeaMy
            key={index}
            isclicked={isclicked}
            handleclick={handleclick}
            subjectName={subjectName}
          />
        ))}
      </ButtonContainer>
    </Box>
  );
};

export default TeasignsubjectMy;
