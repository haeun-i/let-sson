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

class SubmitS extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.props.handleChange;
  }
  render() {
    return (
      <div>
        <Box>
          <Text>
            <hr color="#0D00A4" width="25px" height="10px"></hr>
            {this.props.id} 이름
          </Text>
          <InputBoxShort
            name="name"
            value={this.props.state.name || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBoxShort>
        </Box>
        <Box>
          <Text>
            <hr color="#0D00A4" width="25px" height="10px"></hr>과목
          </Text>
          <InputBoxShort
            name="subject"
            value={this.props.state.subject || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBoxShort>
        </Box>
        <Box>
          <Text>
            <hr color="#0D00A4" width="25px" height="10px"></hr>지역
          </Text>
          <InputBoxShort
            name="region"
            value={this.props.state.region || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBoxShort>
        </Box>
        <Box>
          <Text>
            <hr color="#0D00A4" width="25px" height="10px"></hr>후기
          </Text>
          <InputBoxShort
            name="review"
            value={this.props.state.review || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBoxShort>
        </Box>
        <Box>
          <Text>
            <hr color="#0D00A4" width="40px" height="10px"></hr>소개글
          </Text>
          <InputBox
            name="intro"
            value={this.props.state.intro || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBox>
        </Box>
        <Box>
          <Text>
            <hr color="#0D00A4" width="25px" height="10px"></hr>목표
          </Text>
          <InputBox
            name="goal"
            value={this.props.state.goal || ""}
            onChange={this.handleChange}
            type="text"
          ></InputBox>
        </Box>
      </div>
    );
  }
}

export default SubmitS;
