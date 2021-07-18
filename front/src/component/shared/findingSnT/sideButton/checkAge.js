import React, { useContext } from "react";
import { SidebarContextS } from "../../../../page/findStudent";

const Checkage = () => {
  const {  dispatch } = useContext(SidebarContextS);
  const handleChange = (e) => {
    dispatch({ type: "sortAge", age: e.currentTarget.value });
  };
  return (
    <div>
      연령대
      <div>
        <input
          type="radio"
          name="chk_age"
          value="10"
          onClick={handleChange}
        ></input>
        10대
      </div>
      <div>
        <input
          type="radio"
          name="chk_age"
          value="20"
          onClick={handleChange}
        ></input>
        20대
      </div>
      <div>
        <input
          type="radio"
          name="chk_age"
          value="30"
          onClick={handleChange}
        ></input>
        30대
      </div>
      <div>
        <input
          type="radio"
          name="chk_age"
          value="40"
          onClick={handleChange}
        ></input>
        40대 이상
      </div>
    </div>
  );
};

export default Checkage;
