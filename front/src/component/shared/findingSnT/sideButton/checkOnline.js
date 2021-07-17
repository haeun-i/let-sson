import React, { useContext } from "react";
import { SidebarContextS } from "../../../../page/findStudent";

const CheckOnline = () => {
  const {  dispatch } = useContext(SidebarContextS);

  const handleChangeC = (e) => {
    dispatch({ type: "sortContact", contact: true, nonContact: false });
  };
  const handleChangeNc = (e) => {
    dispatch({ type: "sortNoncontact", contact: false, nonContact: true });
  };

  return (
    <div>
      화상강의 여부
      <div>
        <input
          type="radio"
          name="chk_online"
          value="예"
          onClick={handleChangeC}
        ></input>
        예
      </div>
      <div>
        <input
          type="radio"
          name="chk_online"
          value="아니오"
          onClick={handleChangeNc}
        ></input>
        아니오
      </div>
    </div>
  );
};

export default CheckOnline;
