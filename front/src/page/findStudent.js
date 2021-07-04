import React, { useReducer } from "react";
import InfoCardS from "../component/feature/findStudent/infoCardS";
import HeadButtons from "../component/layout/header/header";
import Sidebar from "../component/shared/findingSnT/sidebar";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #ffffff;
`;

const Side = styled.span`
  height: 100%;
`;

const CardList = styled.div`
  @media only screen and (max-width: 1350px) {
    text-align:center;
  }
`;

export const SidebarContextS = React.createContext();

const INITIAL_STATE = {
  age: "",
  contact: true,
  nonContact: true,
  female: true,
  male: true,
  pay: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "sortPay":
      return { ...state, pay: action.pay };
    case "sortContact":
      return {
        ...state,
        contact: action.contact,
        nonContact: action.nonContact,
      };
    case "sortNoncontact":
      return {
        ...state,
        contact: action.contact,
        nonContact: action.nonContact,
      };
    case "sortMale":
      return { ...state, male: action.male, female: action.female };
    case "sortFemale":
      return { ...state, male: action.male, female: action.female };
    case "sortAge":
      return { ...state, age: action.age };
  }
};

const FindStudent = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <header>
        <HeadButtons />
      </header>
      <Wrapper>
        <SidebarContextS.Provider value={{ state, dispatch }}>
          <Side>
            <Sidebar />
          </Side>
          <CardList>
          <InfoCardS />
          </CardList>
        </SidebarContextS.Provider>
      </Wrapper>
    </div>
  );
};

export default FindStudent;
