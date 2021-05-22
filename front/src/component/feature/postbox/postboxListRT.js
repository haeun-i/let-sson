import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
// 선생이 받은 내역 목록

const Container = styled.div`
  width: 100%;
  /* 1rem = 16px */
  padding: 0.6rem;
  background-color: rgba(0,0,0,0);;
`;

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1fr);
  grid-template-rows: repeat(1fr 10fr 4fr 8fr);
  gap: 1%;
  margin-left: 10%;
  margin-right: 10%;
`;

const Card = styled.li`
  border-top : 2px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-right: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: row;
`;

const Cardelement = styled.div`
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  width: 33%;
  text-align: center;
`;

const Cardbutton = styled.button`
  border: none;
`;

const PostboxListRT = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getRecieve = async () => {
      const dataTRecieve = await axios.get(
        "http://localhost:8080/teachers/getAllReceiving",
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      );
      console.log(dataTRecieve.data);
      setData(dataTRecieve.data);
    };
    getRecieve();
  }, []);

  const connected = tel => {
    axios
      .post(
        `http://localhost:8080/teachers/makeLetsson?student_tel=${tel}`,
        {
          student_tel: tel,
        },
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      )
      .then(response => {
        alert("과외가 체결되었습니다.");
      });
  };

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
                    name: element.sender.name,
                    region: element.sender.region,
                    tel: element.sender.tel,
                    intro: element.sender.intro,
                    goal: element.sender.goal,
                  },
                }}
              >
                <Cardbutton>
                  {element.sender.name}님이 보낸 신청입니다.
                </Cardbutton>
              </Link>
            </Cardelement>
            <Cardelement>기간 : </Cardelement>
            <Cardelement>
              <Cardbutton onClick={() => connected(element.sender.tel)}>
                진행
              </Cardbutton>
              <Cardbutton>삭제</Cardbutton>
            </Cardelement>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default PostboxListRT;
