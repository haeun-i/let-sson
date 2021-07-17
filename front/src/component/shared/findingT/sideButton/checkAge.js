import React, { useContext } from "react";
import { FilterContextT } from "../../../../page/findTeacher";
const CheckageT = () => {
  const {  dispatch } = useContext(FilterContextT);

  const handleChange = e => {
    dispatch({ type: "sortAge", age: e.currentTarget.value });
  };
  return (
    <div>
      연령대
      <div>
        <input
          type="radio"
          name="chk_age"
          value="40"
          onClick={handleChange}
        ></input>
        40세 이상
      </div>
      <div>
        <input
          type="radio"
          name="chk_age"
          value="30"
          onClick={handleChange}
        ></input>
        30세 이상
      </div>
      <div>
        <input
          type="radio"
          name="chk_age"
          value="20"
          onClick={handleChange}
        ></input>
        20세 이상
      </div>
      <div>
        <input
          type="radio"
          name="chk_age"
          value="00"
          onClick={handleChange}
        ></input>
        그 외
      </div>
    </div>
  );
};

export default CheckageT;
