import React from "react";
import styled from "styled-components";

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

const InputBoxShort = styled.input`
  margin-right: 0;
  width: 100%;
  height: 32px;
  padding-bottom: 0px;
  background-color: #f4f4fc;
  border: 3px solid #f4f4fc;
  box-sizing: border-box;
`;

const InputBox = styled.input`
  border: 0.05em solid #010440;
  margin-right: 0;
  padding-bottom: 30px;
  margin-right: 0;
  width: 100%;
  height: 54px;
  padding-bottom: 0px;
  background-color: #f4f4fc;
  border: 3px solid #f4f4fc;
  box-sizing: border-box;
`;

class SubmitT extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.props.handleChange;
  }

  render() {
    return (
      <div>
        <Box>
          <Text> 이름</Text>
          <InputBoxShort
            name="name"
            value={this.props.state.name || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBoxShort>
        </Box>
        <Box>
          <Text>학교</Text>
          <InputBoxShort
            value={this.props.state.university || ""}
            onChange={this.handleChange}
            name="university"
            type="text"
          ></InputBoxShort>
        </Box>
        <Box>
          <Text>학과</Text>
          <InputBoxShort
            name="major"
            value={this.props.state.major || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBoxShort>
        </Box>
        <Box>
          <Text>주요 과목</Text>
          <InputBoxShort
            name="subject"
            value={this.props.state.subject || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBoxShort>
        </Box>
        <Box>
          <Text>지역</Text>
          <InputBoxShort
            name="region"
            value={this.props.state.region || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBoxShort>
        </Box>
        <Box>
          <Text>경력</Text>
          <InputBox
            name="career"
            value={this.props.state.career || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBox>
        </Box>
        <Box>
          <Text>소개글</Text>
          <InputBox
            name="intro"
            value={this.props.state.intro || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBox>
        </Box>
        <Box>
          <Text>계획</Text>
          <InputBox
            name="plan"
            value={this.props.state.plan || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBox>
        </Box>
      </div>
    );
  }
}

export default SubmitT;
