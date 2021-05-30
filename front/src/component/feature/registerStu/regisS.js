import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #ffffff;
  padding-top: 30px;
  width: 50%;
`;
const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5%;
  margin-right: 7%;
  background: #f3f2fc;
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
const BoxShort = styled.div`
  margin-right: 0;
  width: 100%;
  height: 32px;
  padding-bottom: 0px;
  background-color: #f4f4fc;
  border: 3px solid #f4f4fc;
  box-sizing: border-box;
`;

const BoxLong = styled.div`
  border: 0.05em solid #010440;
  margin-right: 0;
  padding-bottom: 30px;
  margin-right: 0;
  width: 100%;
  height: 52px;
  padding-bottom: 0px;
  background-color: #f3f2fc;
  border: 3px solid #f4f4fc;
  box-sizing: border-box;
`;
class RegisS extends React.Component {
  render() {
    return (
      <Wrapper>
        <Box>
          <Text>이름</Text>
          <BoxShort className="name">{this.props.name}</BoxShort>
        </Box>
        <Box>
          <Text>과목</Text>
          <BoxShort className="school">{this.props.subject}</BoxShort>
        </Box>
        <Box>
          <Text>지역</Text>
          <BoxShort className="location">{this.props.region}</BoxShort>
        </Box>
        <Box>
          <Text>자기소개(성격, 성적)</Text>
          <BoxLong className="appeal">{this.props.intro}</BoxLong>
        </Box>
        <Box>
          <Text>목표</Text>
          <BoxLong className="plan">{this.props.goal}</BoxLong>
        </Box>
        <Box>
          <p>수정은 마이페이지에서만 가능합니다.</p>
          <p>신청하기를 눌렀을 때 학생의 정보가 전송됩니다.</p>
        </Box>
      </Wrapper>
    );
  }
}

export default RegisS;
