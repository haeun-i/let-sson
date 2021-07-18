import React, { useContext } from "react";
import { FilterContextT } from "../../../../page/findTeacher";

const CheckOnlineT = () => {
  const { state, dispatch } = useContext(FilterContextT);

  const handleChangeC = e => {
    dispatch({ type: "sortContact", contact: true, nonContact: false });
  };
  const handleChangeNc = e => {
    dispatch({ type: "sortNoncontact", contact: false, nonContact: true });
  };
  return (
    <div>
      화상강의 여부
      <div>
        <input
          type="radio"
          name="chk_contact"
          value="화상강의y"
          onClick={handleChangeC}
        ></input>
        예
      </div>
      <div>
        <input
          type="radio"
          name="chk_contact"
          value="화상강의n"
          onClick={handleChangeNc}
        ></input>
        아니오
      </div>
    </div>
  );
};

export default CheckOnlineT;
