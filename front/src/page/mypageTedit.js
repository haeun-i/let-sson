import React, { useEffect, useReducer } from "react";
import HeadButton from "../component/layout/header/header";
import SidebarMyPt from "../component/shared/myPageT/sidebarMyPt";
import styled from "styled-components";
import TeasignnameMy from "../component/feature/myPageTedit/name_my";
import TeasignsubjectMy from "../component/feature/myPageTedit/subject_my";
import TeasignregionMy from "../component/feature/myPageTedit/region_my";
import TeasignpayMy from "../component/feature/myPageTedit/pay_my";
import TeasigngenderMy from "../component/feature/myPageTedit/gender_my";
import TeasigncontactMy from "../component/feature/myPageTedit/contact_my";
import TeasignattendMy from "../component/feature/myPageTedit/attend_my";
import TeasignproveMy from "../component/feature/myPageTedit/proveimage_my";
import TeasignintroMy from "../component/feature/myPageTedit/intro_my";
import TeasignphoneMy from "../component/feature/myPageTedit/phone_my";
import TeasignpasswordMy from "../component/feature/myPageTedit/password_my";
import TeasignemailMy from "../component/feature/myPageTedit/email_my";
import TeasignuniMy from "../component/feature/myPageTedit/university_my";
import axios from "axios";
import { AuthEmail, AuthPhone } from "../component/shared/auth";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f6f4f3;
  padding-top: 30px;
`;

const Buttonfame = styled.div`
  margin-top: 10px;
  margin-left: 55%;
`;

const SaveNref = styled.button`
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
const Wrapper2 = styled.form`
  width: 85%;
`;

export const ModifyContextT = React.createContext();

const INITIAL_STATE = {
  id: "",
  name: "",
  tel: "",
  email: "",
  password: "",
  region: "",
  male: "",
  photo: "",
  pay: "",
  contact: "",
  major: "",
  university: "",
  is_attend: "",
  rate: "",
  stnum: "",
  intro: "",
  plan: "",
  career: "",
  subject: "",
  passcheck: "",
  prove_image: "",
  role: "",
  appeal: "",
  female: "",
  noncontact: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.name };
    case "setAge":
      return { ...state, age: action.age };
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
    case "setMale":
      return { ...state, male: action.male, female: action.female };
    case "setFemale":
      return { ...state, female: action.female, male: action.male };
    case "setSubject":
      return { ...state, subject: action.subject };
    case "setIsattend":
      return { ...state, is_attend: action.is_attend };
    case "setUniversity":
      return { ...state, university: action.university };
    case "setMajor":
      return { ...state, major: action.major };
    case "setImage":
      return { ...state, prove_image: action.prove_image };
    case "setIntro":
      return { ...state, intro: action.intro };
    case "reset":
      return INITIAL_STATE;
    case "getData":
      return {
        ...state,
        id: action.id,
        name: action.name,
        tel: action.tel,
        email: action.email,
        password: action.password,
        passcheck: action.passcheck,
        region: action.region,
        male: action.male,
        photo: action.photo,
        pay: action.pay,
        contact: action.contact,
        major: action.major,
        university: action.university,
        is_attend: action.is_attend,
        rate: action.rate,
        stnum: action.stnum,
        intro: action.intro,
        plan: action.plan,
        career: action.career,
        subject: action.subject,
        prove_image: action.prove_image,
        role: action.role,
        appeal: action.appeal,
        female: action.female,
        noncontact: action.noncontact,
      };
    default:
      return state;
  }
};

const MypageTe = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const profileData = async () => {
      const dataT = await axios.get(
        "http://localhost:8080/teachers/teacherInfo",
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      );
      console.log(dataT);
      dispatch({
        type: "getData",
        id: dataT.data.data.id,
        name: dataT.data.data.name,
        tel: dataT.data.data.tel,
        password: "",
        email: dataT.data.data.email,
        region: dataT.data.data.region,
        male: dataT.data.data.male,
        photo: dataT.data.data.photo,
        pay: dataT.data.data.pay,
        contact: dataT.data.data.contact,
        major: dataT.data.data.major,
        university: dataT.data.data.university,
        is_attend: dataT.data.data.is_attend,
        rate: dataT.data.data.rate,
        stnum: dataT.data.data.stnum,
        intro: dataT.data.data.intro,
        plan: dataT.data.data.plan,
        career: dataT.data.data.career,
        subject: dataT.data.data.subject,
        prove_image: dataT.data.data.prove_image,
        role: dataT.data.data.role,
        appeal: dataT.data.data.appeal,
        female: dataT.data.data.female,
        noncontact: dataT.data.data.nonContact,
      });
    };
    profileData();
  }, []);

  const emailValidation = (email) => {
    const emailStat = AuthEmail(email);
    console.log(emailStat);
    return emailStat;
  };

  const phoneValidation = (num) => {
    const phoneStat = AuthPhone(num);
    console.log(phoneStat);
    return phoneStat;
  };

  const EditSuccess = async (e) => {
    e.preventDefault();

    if (state.password === "" || state.passcheck === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (state.password !== state.passcheck) {
      alert("비밀번호를 확인해주세요.");
    } else if (!emailValidation(state.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
    } else if (!phoneValidation(state.tel)) {
      alert("핸드폰 번호 형식이 올바르지 않습니다.( '-' 포함)");
    } else if (state.password.length < 8) {
      alert("비밀번호는 8자리 이상이어야 합니다.");
    } else {
      await axios
        .put(
          "http://localhost:8080/teachers/basicModify",
          {
            iD: parseInt(state.id, 10),
            name: state.name,
            tel: state.tel,
            email: state.email,
            password: state.password,
            region: state.region,
            male: state.male,
            PHOTO: state.photo,
            pay: parseInt(state.pay, 10),
            contact: state.contact,
            major: state.major,
            university: state.university,
            is_attend: state.is_attend,
            RATE: state.rate,
            STNUM: parseInt(state.stnum, 10),
            INTRO: state.intro,
            PLAN: state.plan,
            Career: state.career,
            subject: state.subject,
            prove_image: state.prove_image,
            role: state.role,
            appeal: state.appeal,
            female: state.female,
            nonContact: state.noncontact,
          },
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        )
        .then(function (response) {
          alert("회원정보가 수정되었습니다.");
        })
        .catch(function (error) {
          alert("회원정보 수정에 실패하였습니다.");
        });
    }
  };

  return (
    <div>
      <HeadButton />
      <SidebarMyPt />
      <Wrapper>
        선생님
        <ModifyContextT.Provider value={{ state, dispatch }}>
          <Wrapper2 onSubmit={EditSuccess}>
            <TeasignnameMy />
            <TeasignsubjectMy />
            <TeasigngenderMy />
            <TeasignpayMy />
            <TeasignregionMy />
            <TeasigncontactMy />
            <TeasignattendMy />
            <TeasignuniMy />
            <TeasignproveMy />
            <TeasignintroMy />
            <TeasignemailMy />
            <TeasignphoneMy />
            <TeasignpasswordMy />
            <Buttonfame>
              <SaveNref type="submit" value="저장하기">
                저장하기
              </SaveNref>
              <SaveNref
                type="reset"
                onClick={() => dispatch({ type: "reset" })}
                value="원래대로"
              >
                원래대로
              </SaveNref>
            </Buttonfame>
          </Wrapper2>
        </ModifyContextT.Provider>
      </Wrapper>
    </div>
  );
};

export default MypageTe;
