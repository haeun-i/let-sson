import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FilterContextT } from "../../../page/findTeacher";

const Profile = styled.div`
  background-color: #f3f2fc;
  height: 270px;
  width: 230px;
  display: inline-block;
  margin-top: 30px;
  margin-left: 30px;
  position: grid;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  justify-content: space-around;
  text-align: center;
  padding-top: 10px;
`;
const Text = styled.div`
  text-align: center;
  font-weight: bold;
  color: black;
  margin: 1px;
`;

function MyName({
  id,
  name,
  university,
  major,
  subject,
  region,
  age,
  contact,
  noncontact,
  female,
  male,
  pay,
  career,
  intro,
  plan,
  rate,
  tel,
  photo,
}) {
  const { state } = useContext(FilterContextT);

  if (parseInt(state.age) > age) {
    return null;
  } else if (state.male !== state.female && state.male !== male) {
    return null;
  } else if (state.male !== state.female && state.female !== female) {
    return null;
  } else if (state.contact !== state.nonContact && state.contact !== contact) {
    return null;
  } else if (
    state.contact !== state.nonContact &&
    state.nonContact !== noncontact
  ) {
    return null;
  } else if (state.pay !== "" && parseInt(state.pay) !== pay) {
    return null;
  } else {
    return (
      <Link
        to={{
          pathname: "/registertea",
          state: {
            id,
            name,
            university,
            major,
            subject,
            region,
            career,
            intro,
            plan,
            rate,
            tel,
            photo,
          },
        }}
      >
        <Profile>
          <img src={photo} alt="프로필사진" width="150px" height="150px" />
          <Text>이름: {name}</Text>
          <Text>과목: {subject}</Text>
          <Text>지역: {region}</Text>
          <Text>한줄소개: {intro}</Text>
        </Profile>
      </Link>
    );
  }
}

function InfoCardT() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    async function cardData() {
      try {
        const response = await axios.get(
          "https://let-sson.herokuapp.com/users/teachers",
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    cardData();
  }, []);

  return (
    <span>
      {Data.map(whoname => (
        <MyName
          key={whoname.id}
          id={whoname.id}
          name={whoname.name}
          university={whoname.university}
          major={whoname.major}
          subject={whoname.subject}
          region={whoname.region}
          age={whoname.age}
          contact={whoname.contact}
          noncontact={whoname.nonContact}
          female={whoname.female}
          male={whoname.male}
          pay={whoname.pay}
          career={whoname.career}
          intro={whoname.intro}
          plan={whoname.plan}
          rate={whoname.rate}
          tel={whoname.tel}
          photo={whoname.photo}
        />
      ))}
    </span>
  );
}

export default InfoCardT;
