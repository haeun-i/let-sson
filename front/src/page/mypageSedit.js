import React, { useReducer, useEffect } from "react";
import HeadButton from "../component/layout/header/header";
import HeadSaveNrefs from "../component/layout/header/header";
import SidebarMyPt from "../component/shared/myPageT/sidebarMyPt";
import StusignageMy from "../component/feature/myPageSedit/age_my";
import StusigncontactMy from "../component/feature/myPageSedit/contact_my";
import StusignpayMy from "../component/feature/myPageSedit/pay_my";
import StusigngenderMy from "../component/feature/myPageSedit/gender_my";
import StusignregionMy from "../component/feature/myPageSedit/region_my";
import StusignemailMy from "../component/feature/myPageSedit/email_my";
import StusignisstuMy from "../component/feature/myPageSedit/isstudent_my";
import StusignnameMy from "../component/feature/myPageSedit/name_my";
import StusignpasswordMy from "../component/feature/myPageSedit/password_my";
import StusignphoneMy from "../component/feature/myPageSedit/phone_my";
import StusignpropergenderMy from "../component/feature/myPageSedit/propergender_my";
import StusignsubjectMy from "../component/feature/myPageSedit/subject_my";
import styled from "styled-components";
import axios from "axios";
import HeadButtons from "../component/layout/header/header";
import myPback from "./successbackg.jpg";
import SidebarMyPs from "../component/shared/myPageS/sidebarMyPs";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url(${myPback});
  background-size: contain;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;
const SaveNref = styled.button`
  height: 50px;
  background: #463ea0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-top: 5px;
  margin-bottom: 40px;
  margin-left: 50px;
  margin-right: 50px;
  color: white;
  border: 0;
  outline: 1;
`;

const Buttonfame = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const Wrapper2 = styled.div`
  width: 50%;
  background: #ffffff;
  border: 1px solid #f3f2fc;
  box-sizing: border-box;
`;

const Blue = styled.span`
  color: #0d00a4;
`;

const Circle1 = styled.div`
  position: absolute;
  background-image: url(https://s3-alpha-sig.figma.com/img/fcbf/2bdb/a151e666636c5620c3b5533a5cc5817c?Expires=1622419200&Signature=Hht9i4BZlUyxYnPhFgIhSElREA6PYWoxxT-MUUG-of9MxyM9ug2tG7l9jDlKXeWJHUpI3TxP6yfeXALMdRICmB0gGXEgWNvFmi1utuNON2WyZVlRktWXWrtjwjWly2Vesqcsftcp7a9kftMWvAYvyX4UyFyg~64ybgbF0-fxMj4nvgoMOtQoFKZnvMP2RADKg6VCHs0Ey-aolA7ELED09yIdEssNblxsuePYFmeI7dVIHJHT2uwddH83DARTo5etSijM6uvMEyjkvorYJCzmUp0O6BxCJ6stCycXBES4CJ0TEmu8vA~7fpaDWDQyUFkeeCyyWgxcLwikvf1McziUxQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA);
  background-position: center;
  background-size: cover;
  margin-top: 25%;
  margin-left: 79%;
  text-align: center;
  line-height: 200px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  font-weight: bold;
  font-weight: bold;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
`;

const Circle2 = styled.div`
  position: absolute;
  background-image: url(https://s3-alpha-sig.figma.com/img/03df/c6a8/415db81c007c30d615ba33a27cb1a327?Expires=1622419200&Signature=LKlEJlvlpA2pqq0wAhdBHNa4LEjP6koZxvyeE5wnOgThtQAkCatmq0Ju3E0y4cszru-GlfDYtgcbjOGQrdWzUX0vpZ0syRHNbfkyjWunv3u0EJD2iMURua5lCHjAn1a5tBNBOeDiHflTJsyyle0gKLauZACPd3ZMJh0paBLJI8SvmLw2cToiqQ~C-8S1O4k0S2qDoVV1Rdb~5VWZdAp-sF6ytXPTrq4bSjYib1Yqa5HvnMvqiqHGzY7mH0XyJie9KyUEhhS5PSk4mdG7gVQ0MVNbDU1mD0mYnWfW37iFRoeQHG5AcEp~NKhHh8-NtJJWrKNFGMIOxiBEmuPJwpy1kg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA);
  background-position: center;
  background-size: cover;
  margin-top: 10%;
  margin-left: 9%;
  text-align: center;
  line-height: 200px;
  box-shadow: -90px -90px #f3f2fc;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
`;

const Text1 = styled.div`
  position: absolute;
  margin-left: 10%;
  margin-right: 60%;
  padding-top: 30%;
  padding-bottom: 50px;
  color: #0d00a4;
`;
const Text2 = styled.div`
  margin-left: 25%;
  margin-right: 60%;
  padding-top: 50px;
  padding-bottom: 50px;
`;
const Bar = styled.div`
  margin-left: 30%;
  margin-right: 50%;
  margin-bottom: 100px;
`;

export const ModifyContextS = React.createContext();

const INITIAL_STATE = {
  name: "",
  tel: "",
  email: "",
  region: "",
  subject: "",
  age: "",
  contact: "",
  male: "",
  proper_gender: "",
  goal: "",
  intro: "",
  pay: "",
  is_stu: "",
  password: "",
  passcheck: "",
  role: "",
  review: "",
  female: "",
  nonContact: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.name };
    case "setAge":
      return { ...state, age: action.age };
    case "setIsstu":
      return { ...state, is_stu: action.is_stu };
    case "setMale":
      return { ...state, male: action.male, female: action.female };
    case "setFemale":
      return { ...state, female: action.female, male: action.male };
    case "setPropergender":
      return { ...state, proper_gender: action.proper_gender };
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
    case "getData":
      return {
        ...state,
        tel: action.tel,
        name: action.name,
        email: action.email,
        region: action.region,
        subject: action.subject,
        age: action.age,
        contact: action.contact,
        male: action.male,
        proper_gender: action.proper_gender,
        pay: action.pay,
        is_stu: action.is_stu,
        role: action.role,
        female: action.female,
        nonContact: action.nonContact,
      };
    case "reset":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const MypageSe = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const profileData = async () => {
      const dataS = await axios.get(
        "http://localhost:8080/students/studentInfo",
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      );
      console.log(dataS);
      dispatch({
        type: "getData",
        name: dataS.data.data.name,
        tel: dataS.data.data.tel,
        email: dataS.data.data.email,
        region: dataS.data.data.region,
        subject: dataS.data.data.subject,
        age: dataS.data.data.age,
        contact: dataS.data.data.contact,
        male: dataS.data.data.male,
        proper_gender: dataS.data.data.proper_gender,
        pay: dataS.data.data.pay,
        is_stu: dataS.data.data.is_stu,
        password: "",
        role: dataS.data.data.role,
        female: dataS.data.data.female,
        nonContact: dataS.data.data.nonContact,
      });
    };
    profileData();
  }, []);

  const EditSuccess = async e => {
    e.preventDefault();
    if (state.password === "" || state.passcheck === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (state.password !== state.passcheck) {
      alert("비밀번호를 확인해주세요.");
    } else {
      console.log(state);

      await axios
        .put(
          "http://localhost:8080/students/basicModify",
          {
            id: state.id,
            name: state.name,
            tel: state.tel,
            email: state.email,
            region: state.region,
            subject: state.subject,
            age: parseInt(state.age),
            contact: state.contact,
            male: state.male,
            proper_gender: state.proper_gender,
            goal: state.goal,
            intro: state.intro,
            pay: parseInt(state.pay),
            is_stu: state.is_stu,
            password: state.password,
            role: state.role,
            review: state.review,
            female: state.female,
            nonContact: state.nonContact,
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
      <HeadButtons />
      <Circle1></Circle1>
      <Circle2></Circle2>
      <Container>
        <Text1>
          Better Education<br></br>Better Life
        </Text1>
        <Text2>
          <hr color="#0D00A4" width="45px" height="10px"></hr>
          <Blue>학생</Blue> 페이지
        </Text2>
        <Bar>
          <SidebarMyPs />
        </Bar>
        <Wrapper>
          <ModifyContextS.Provider value={{ state, dispatch }}>
            <Wrapper2 onSubmit={EditSuccess}>
              <StusignnameMy />
              <StusignisstuMy />
              <StusignageMy />
              <StusigngenderMy />
              <StusignpropergenderMy />
              <StusignregionMy />
              <StusignsubjectMy />
              <StusignpayMy />
              <StusigncontactMy />
              <StusignphoneMy />
              <StusignemailMy />
              <StusignpasswordMy />
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
          </ModifyContextS.Provider>
        </Wrapper>
      </Container>
    </div>
  );
};

export default MypageSe;
