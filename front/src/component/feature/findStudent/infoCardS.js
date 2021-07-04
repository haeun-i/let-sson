import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { SidebarContextS } from "../../../page/findStudent";

const Profile = styled.div`
  background-color: #f3f2fc;
  height: 250px;
  width: 200px;
  display: inline-block;
  margin-top: 30px;
  margin-left: 30px;
  position: grid;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Text = styled.div`
  text-align: center;
  font-weight: bold;
  color: black;
  margin: 1px;
`;
const MyName = ({
  id,
  name,
  subject,
  region,
  age,
  male,
  female,
  contact,
  noncontact,
  pay,
  intro,
  goal,
  tel,
}) => {
  const { state, dispatch } = useContext(SidebarContextS);

  if (
    state.age !== "" &&
    state.age !== "40" &&
    parseInt(state.age) / 10 !== parseInt(age / 10)
  ) {
    return null;
  } else if (
    state.age === "40" &&
    parseInt(age / 10) < parseInt(state.age) / 10
  ) {
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
          pathname: "/registerstu",
          state: {
            id,
            name,
            subject,
            region,
            age,
            intro,
            goal,
            tel,
          },
        }}
      >
        <Profile>
          <Text>이름: {name}</Text>
          <Text>과목: {subject}</Text>
          <Text>지역: {region}</Text>
          <Text>나이: {age}</Text>
        </Profile>
      </Link>
    );
  }
};

const InfoCardS = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    async function cardData() {
      try {
        const response =  await axios
              .get("http://localhost:8080/users/students", {
                headers: {
                  "X-AUTH-TOKEN": localStorage.getItem("token"),
                },
              });
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    };
    cardData();
  }, []);

  return (
    <span>
      {Data.map(whoname => (
        <MyName
          key={whoname.id}
          id={whoname.id}
          name={whoname.name}
          subject={whoname.subject}
          region={whoname.region}
          age={whoname.age}
          contact={whoname.contact}
          noncontact={whoname.nonContact}
          female={whoname.female}
          male={whoname.male}
          pay={whoname.pay}
          intro={whoname.intro}
          goal={whoname.goal}
          tel={whoname.tel}
        />
      ))}
    </span>
  );
};

export default InfoCardS;
