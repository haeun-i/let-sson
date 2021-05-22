import React, { useState, useEffect } from "react";
import styled from "styled-components";
// 학생이 보낸 내역 목록
// 진행, 완료 기능 만들고 후기 만드려고 미뤄둠
const Container = styled.div`
  width: 100%;
  /* 1rem = 16px */
  padding: 0.6rem;
  background-color: rgba(0,0,0,0);
`;

const CardList = styled.ul`
  gap: 1%;
  margin-left: 10%;
  margin-right: 10%;
`;

const Card = styled.li`
  border-top: 2px solid lightgrey;
  border-bottom : 2px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: row;
`;

const Cardelement1 = styled.div`
  padding-top : 3%;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  width: 5%;
  text-align: center;
`;

const Cardelement2 = styled.div`
  border-left: 1px solid lightgrey;
  width: 10%;
  text-align: center;
  
`;

const Cardelement3 = styled.div`
  width: 33%;
  text-align: right;
  flex-grow : 3;
  margin-right : 15%;
  color : grey;
`;

const Cardelement4 = styled.div`
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  width: 10%;
  text-align: center;
  flex-grow : 4;
`;

const Cardbutton = styled.button`
  border: none;
`;
const Posttest = () => {
  const [data, setData] = useState([
    ["선생이름", "기간"],
    ["선생이름", "기간"],
    ["선생이름", "기간"],
  ]);

  const deleteSend = () => {
    console.log("지우기");
  };

  return (
    <Container>
      <CardList>
        {data.map((element, index) => (
          <Card key={element.index}>
            <Cardelement1>{index + 1}</Cardelement1>
            <Cardelement2>두번째</Cardelement2>
            <Cardelement3>기간 : </Cardelement3>
            <Cardelement4>
              <Cardbutton onClick={() => deleteSend()}>삭제</Cardbutton>
            </Cardelement4>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default Posttest;