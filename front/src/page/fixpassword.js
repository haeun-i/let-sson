import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import {useLocation} from "react-router";
import HeadButton from "../component/layout/header/header";
import styled from "styled-components";
import axios from "axios";
const Wrapper = styled.div`
  background-color: #f6f4f3;
  position: absolute;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  position: absolute;
  width: 500px;
  height: 180px;
  margin-left: -200px;
  margin-top: -90px;
  left: 50%;
  top: 40%;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const FindText = styled.div`
  margin-bottom: 30px;
  padding-right: 10px;
`;
const SuccessBtn = styled.input`
  width: 70%;
  height: 50px;
  color: white;
  font-size: 16px;
  border: none;
  margin-top: 1%;
  margin-left: 10%;
  border-radius: 50px;
  background: linear-gradient(
    to right,
    rgba(104, 104, 104, 1) 18%,
    rgba(43, 62, 104, 1) 70%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#686868', endColorstr='#2b3e68',GradientType=1 ); /* IE6-9 */
`;
const LogText1 = styled.span`
  text-align: right;
  padding-right: 15%;
  margin-left: 35px;
`;
const LogText2 = styled.span`
  text-align: right;
  padding-right: 8%;
  margin-left: 35px;
`;
const FindInput = styled.input`
  background-color: #f6f4f3;
  border: 1px solid black;
  margin-right: 0;
  width: 55%;
  height: 100%;
`;



const INITIAL_STATE = {
  checkpassword: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setPassword":
      return { ...state, password: action.password };
    case "setCheckpassword":
      return { ...state, checkpassword: action.checkpassword };
  }
};

const Fixpassword = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const history = useHistory();
  const location = useLocation();
  const tel = location.state.tel;

  

  const confirm = async e => {
    e.preventDefault();
    if(state.password !== state.checkpassword){
      alert("비밀번호가 일치하지 않습니다.")
    }else{
      const data = { password: state.password ,tel:tel};
    console.log(data);
    await axios
      .put(`http://localhost:8080/users/resetPassword/?password=${state.password}&tel=${tel}`,
      )
      .then(function (response) {
        console.log(response);
        alert("비밀번호 수정 완료.");
        history.push("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  const handleChangeP = e => {
    dispatch({ type: "setPassword", password: e.currentTarget.value });
  };
  const handleChangeC = e => {
    dispatch({ type: "setCheckpassword", checkpassword: e.currentTarget.value });
  };

  return (
    <div>
      <HeadButton />
      <Wrapper>
        <Form>
          <FindText>
            <label classpassword="tofindtel">
              <LogText1> 새 비밀번호 </LogText1>
              <FindInput type="text" onChange={handleChangeP}></FindInput>
            </label>
          </FindText>
          <FindText>
            <label classpassword="tofindtel">
              <LogText2>새 비밀번호 확인</LogText2>
              <FindInput
                type="text"
                placeholder="비밀번호 확인"
                onChange={handleChangeC}
              ></FindInput>
            </label>
          </FindText>
          <SuccessBtn type="submit" value="확인" onClick={confirm}></SuccessBtn>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Fixpassword;
