import React, { useReducer,useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  tel: "",
  name: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.name };
    case "setTel":
      return { ...state, tel: action.tel };
    case "checkTel":
      return { ...state, tel: action.tel };
  }
};

const Findpassword = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const history = useHistory();

  useEffect(() => {
    if (state.tel.length === 10) {
      dispatch({
        type: "checkTel",
        tel: state.tel.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      });
    }
    if (state.tel.length === 13) {
      dispatch({
        type: "checkTel",
        tel: state.tel
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      });
    }
  }, [state.tel]);

  const confirm = async e => {
    e.preventDefault();
    const data = { name: state.name, tel: state.tel };
    console.log(data);
    await axios
      .get("http://localhost:8080/users/findPassword", {
        params: { name: state.name, tel: state.tel },
      })
      .then(function (response) {
        console.log(response);
        if (response.data === true){
          alert("비밀번호 변경 페이지로 이동합니다.");
          history.push({
            pathname:"/fixpassword",
            state:{tel:state.tel},
        });
        } else if (response.data === false){
          alert("회원정보와 일치하는 전화번호가 존재하지 않습니다.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChangeN = e => {
    dispatch({ type: "setName", name: e.currentTarget.value });
  };
  const handleChangeP = e => {
    dispatch({ type: "setTel", tel: e.currentTarget.value });
  };

  return (
    <div>
      <HeadButton />
      <Wrapper>
        <Form>
          <FindText>
            <label className="tofindtel">
              <LogText1>이름</LogText1>
              <FindInput type="text" onChange={handleChangeN}
               placeholder="이름"></FindInput>
            </label>
          </FindText>
          <FindText>
            <label className="tofindtel">
              <LogText2>사용자 번호</LogText2>
              <FindInput
                type="text"
                placeholder="핸드폰 번호"
                value={state.tel}
                onChange={handleChangeP}
              ></FindInput>
            </label>
          </FindText>
          <SuccessBtn type="submit" value="확인" onClick={confirm}></SuccessBtn>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Findpassword;
