import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
// 선생이 보낸 내역 목록

const Container = styled.div`
  width: 100%;
  /* 1rem = 16px */
  padding: 0.6rem;
  background-color: #f6f4f3;
`;

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1fr);
  grid-template-rows: repeat(1fr 3fr 2fr 4fr);
  gap: 30px;
  margin-left: 10%;
  margin-right: 10%;
`;

const Card = styled.li`
  border-top: solid 3px #010440;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: row;
`;

const Cardelement = styled.div`
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  width: 33%;
  text-align: center;
`;

const Cardbutton = styled.button`
  border: none;
`;

const PostboxListST = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSend = async () => {
      const dataTSend = await axios.get(
        "http://localhost:8080/teachers/getAllSending",
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      );
      console.log(dataTSend.data);
      setData(dataTSend.data);
    };
    getSend();
  }, []);

  return (
    <Container>
      <CardList>
        {data.map((element, index) => (
          <Card key={element.id}>
            <Cardelement>{index + 1}</Cardelement>
            <Cardelement>
              <Link
                to={{
                  pathname: "/postboxdetailS",
                  state: {
                    name: element.receiver.name,
                    period: element.receiver.period,
                    name: element.receiver.name,
                    region : element.receiver.region,
                    tel : element.receiver.tel,
                    intro : element.receiver.intro,
                    goal : element.receiver.goal,
                  },
                }}
              >
                <Cardbutton>{element.receiver.name}님에게 보낸 신청입니다.</Cardbutton>
              </Link>
            </Cardelement>
            <Cardelement>기간:</Cardelement>
            <Cardelement>
              <Cardbutton>진행</Cardbutton>
              <Cardbutton>완료</Cardbutton>
              <Cardbutton>삭제</Cardbutton>
            </Cardelement>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default PostboxListST;
