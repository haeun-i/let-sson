import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
// 학생이 받은 내역 목록

const Container = styled.div`
  width: 100%;
  /* 1rem = 16px */
  padding: 0.6rem;
  background-color: rgba(0,0,0,0);
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
  border-top: 2px solid lightgrey;
  border-bottom : 2px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
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

const PostboxListRS = () => {
  const [data, setData] = useState([]);
  const [connect, setConnect] = useState(false);
  useEffect(() => {
    const getRecieve = async () => {
      const dataSRecieve = await axios.get(
        "http://localhost:8080/students/getAllReceiving",
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      );
      console.log(dataSRecieve.data);
      setData(dataSRecieve.data);
    };
    getRecieve();
  }, []);

  const deleteSend = tel => {
    console.log(tel);

    if (window.confirm("정말로 받은 신청을 삭제하겠습니까?")) {
      axios.delete(
        "http://localhost:8080/students/deleteSending",
        {
          data: { teacher_tel: tel },
          headers: { "X-AUTH-TOKEN": localStorage.getItem("token") },
        }
        // {
        //   teacher_tel : tel,
        // },
        // {
        //   headers: {
        //     "X-AUTH-TOKEN": localStorage.getItem("token"),
        //   },
        // }
      );
    }
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
                  pathname: "/postboxdetailT",
                  state: {
                    name: element.sender.name,
                    university: element.sender.university,
                    major: element.sender.major,
                    subject: element.sender.subject,
                    region: element.sender.region,
                    tel: element.sender.tel,
                    career: element.sender.career,
                    intro: element.sender.intro,
                    plan: element.sender.plan,
                  },
                }}
              >
                <Cardbutton>
                  {element.sender.name}님이 보낸 신청입니다.
                </Cardbutton>
              </Link>
            </Cardelement>
            <Cardelement>기간:</Cardelement>
            <Cardelement>
              <Cardbutton onClick={() => deleteSend(element.sender.tel)}>
                삭제
              </Cardbutton>
            </Cardelement>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default PostboxListRS;
