import React, { useContext } from "react";
import styled from "styled-components";
import { ModifyContextT } from "../../../page/mypageTedit";

const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5%;
  margin-right: 7%;
  background: #ffffff;
  margin-top: 10px;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #0d00a4;
`;

const TeasignproveMy = () => {
  const { state, dispatch } = useContext(ModifyContextT);

  const handleChange = e => {
    dispatch({ type: "setImage", prove_image: e.currentTarget.value });
  };

  return (
    <Box>
      <Text>학력을 증명할 사진을 첨부해주세요 ex)재학증명서</Text>
      <label className="teaProve">
        <input
          type="file"
          accept="image/png, image/jpg"
          name="proveimage"
          value={state.prove_image || ""}
          onChange={handleChange}
        ></input>
      </label>
    </Box>
  );
};

export default TeasignproveMy;
