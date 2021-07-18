import React from "react";
import styled from "styled-components";

const SignBtns = styled.div`
  margin-top: 10px;
  margin-left: 55%;
`;

const SignBtn = styled.input`
  height: 45px;
  width: 100px;
  border-top: solid 3px #010440;
  border-left: none;
  border-right: none;
  border-bottom: none;
  background-color: white;
  font-size: 16px;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
`;

class SignBtnn extends React.Component {
  Signed() {
    console.log("가입되었습니다.");
  }

  render() {
    return (
      <SignBtns>
        <SignBtn type="submit" onClick={this.Signed} value="확인"></SignBtn>
        <SignBtn type="reset" value="취소"></SignBtn>
      </SignBtns>
    );
  }
}

export default SignBtnn;
