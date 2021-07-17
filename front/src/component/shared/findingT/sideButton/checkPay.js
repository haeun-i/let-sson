import React, { useContext } from "react";
import { FilterContextT } from "../../../../page/findTeacher";

const CheckpayT = () => {
  const { dispatch } = useContext(FilterContextT);

  const handleChange = (e) => {
    dispatch({ type: "sortPay", pay: e.currentTarget.value });
  };
  return (
    <div>
      금액
      <div>
        <input
          type="radio"
          name="chk_budget"
          value="10"
          onClick={handleChange}
        ></input>
        10만원 대
      </div>
      <div>
        <input
          type="radio"
          name="chk_budget"
          value="20"
          onClick={handleChange}
        ></input>
        20만원 대
      </div>
      <div>
        <input
          type="radio"
          name="chk_budget"
          value="30"
          onClick={handleChange}
        ></input>
        30만원 대
      </div>
      <div>
        <input
          type="radio"
          name="chk_budget"
          value="40"
          onClick={handleChange}
        ></input>
        40만원 대
      </div>
      <div>
        <input
          type="radio"
          name="chk_budget"
          value="50"
          onClick={handleChange}
        ></input>
        그 이상
      </div>
    </div>
  );
};

export default CheckpayT;
