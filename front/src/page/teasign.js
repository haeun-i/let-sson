import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HeadButton from "../component/layout/header/header";
import Teasignname from "../component/feature/teacherSign/name";
import Teasignsubject from "../component/feature/teacherSign/subject";
import Teasigngender from "../component/feature/teacherSign/gender";
import Teasignpay from "../component/feature/teacherSign/pay";
import Teasignregion from "../component/feature/teacherSign/region";
import Teasigncontact from "../component/feature/teacherSign/contact";
import Teasignattend from "../component/feature/teacherSign/attend";
import Teasignintro from "../component/feature/teacherSign/intro";
import Teasignpassword from "../component/feature/teacherSign/password";
import Teasignemail from "../component/feature/teacherSign/email";
import Teasignphone from "../component/feature/teacherSign/phone";
import Teasignuni from "../component/feature/teacherSign/university";
import styled from "styled-components";
import { AuthEmail, AuthPhone } from "../component/shared/auth";
import Signlogotext from "../component/feature/studentSign/signlogotext";

const Wrapper = styled.form`
left: 20vw;
top: 35vh;
width: 60vw;
padding-top: 30px;
margin-bottom: 30px;
border-top: solid 20px #463ea0;
border-left: solid 40px #463ea0;
border-right: solid 40px #463ea0;
border-bottom: solid 20px #463ea0;
margin-top : 10%;
margin-left : 20%;
background-color : white;
}

@media only screen and (max-height : 700px) {
margin-top : 35vh;
}

@media (min-width: 320px) and (max-width: 480px) {
width : 95vw;
position : absolute;
border : solid 10px #463ea0;
margin-left : 0;
left : 0;
top : 20vh;
}
`;
const Body = styled.div`
  overflow: auto;
  background-color: #f5f4f2;
`;
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

export const CounterContext = React.createContext();

const INITIAL_STATE = {
  name: "",
  male: "",
  female: "",
  pay: 0,
  tel: "",
  password: "",
  passcheck: "",
  email: "",
  contact: "",
  noncontact: "",
  is_attend: "",
  intro: "",
  university: "",
  major: "",
  subject: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.name };
    case "setAge":
      return { ...state, age: action.age };
    case "setMale":
      return { ...state, male: action.male, female: action.female };
    case "setFemale":
      return { ...state, female: action.female, male: action.male };
    case "setRegion":
      return { ...state, region: action.region };
    case "setPassword":
      return { ...state, password: action.password };
    case "setPasscheck":
      return { ...state, passcheck: action.passcheck };
    case "setPay":
      return { ...state, pay: action.pay };
    case "setTel":
      return { ...state, tel: action.tel };
    case "setEmail":
      return { ...state, email: action.email };
    case "setContact":
      return {
        ...state,
        contact: action.contact,
        noncontact: action.noncontact,
      };
    case "setNoncontact":
      return {
        ...state,
        noncontact: action.noncontact,
        contact: action.contact,
      };
    case "setSubject":
      return { ...state, subject: action.subject };
    case "setIsattend":
      return { ...state, is_attend: action.is_attend };
    case "setUniversity":
      return { ...state, university: action.university };
    case "setMajor":
      return { ...state, major: action.major };
    case "setIntro":
      return { ...state, intro: action.intro };
    case "reset":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const Teasign = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [files] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (state.tel.length === 10) {
      dispatch({
        type: "setTel",
        tel: state.tel.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      });
    }
    if (state.tel.length === 13) {
      dispatch({
        type: "setTel",
        tel: state.tel
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      });
    }
  }, [state.tel]);

  const emailValidation = email => {
    const emailStat = AuthEmail(email);
    console.log(emailStat);
    return emailStat;
  };

  const phoneValidation = num => {
    const phoneStat = AuthPhone(num);
    console.log(phoneStat);
    return phoneStat;
  };

  const Signed = async e => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("file", files);

    if (
      state.name === "" ||
      state.tel === "" ||
      state.password === "" ||
      state.location === "" ||
      state.email === "" ||
      state.subject === ""
    ) {
      alert("필수 정보가 모두 기입되었는지 확인 해주세요.");
    } else if (!emailValidation(state.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
    } else if (!phoneValidation(state.tel)) {
      alert("핸드폰 번호 형식이 올바르지 않습니다.( '-' 포함)");
    } else if (state.password.length < 8) {
      alert("비밀번호는 8자리 이상이어야 합니다.");
    } else if (state.password !== state.passcheck) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      console.log(state);
      await axios
        .post("https://let-sson.herokuapp.com/teachers/join", {
          career: "",
          contact: state.contact,
          edStNum: 0,

          email: state.email,
          female: state.female,
          ingStNum: 0,
          intro: state.intro,
          is_attend: state.is_attend,
          major: state.major,
          male: state.male,
          name: state.name,
          nonContact: state.noncontact,
          password: state.password,
          pay: parseInt(state.pay),
          plan: "",

          region: state.region,
          role: state.role,
          subject: state.subject,
          tel: state.tel,
          university: state.university,
        })
        .then(response => {
          alert("가입에 성공하였습니다.");
          history.push("/login");
        })
        .catch(err => {
          alert(
            "가입에 실패하였습니다. 아이디 중복체크 및 필수정보 기입 여부를 재확인해주세요."
          );
          console.log(err.response);
        });
    }
  };

  return (
    <div>
      <HeadButton />
      <Body>
        <Signlogotext></Signlogotext>
        <CounterContext.Provider value={{ state, dispatch }}>
          <Wrapper onSubmit={Signed}>
            <Teasignname />
            <Teasignsubject />
            <Teasigngender />
            <Teasignpay />
            <Teasignregion />
            <Teasigncontact />
            <Teasignattend />
            <Teasignuni />
            {/* <Box>
              <Text>학력을 증명할 사진을 첨부해주세요 ex)재학증명서</Text>
              <label className="teaProve">
                <input
                  type="file"
                  accept="image/png, image/jpg"
                  name="proveimage"
                  onChange={handleChange}
                ></input>
              </label>
            </Box> */}
            <Teasignintro />
            <Teasignemail />
            <Teasignphone />
            <Teasignpassword />

            <SignBtns>
              <SignBtn type="submit" value="확인"></SignBtn>
              {/* <SignBtn
                type="reset"
                onClick={() => dispatch({ type: "reset" })}
                value="취소"
              ></SignBtn> */}
            </SignBtns>
          </Wrapper>
        </CounterContext.Provider>
      </Body>
    </div>
  );
};

export default Teasign;
