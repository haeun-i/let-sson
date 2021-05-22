import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Ratingdropbtn from "./Ratingdropbtn";
import "./Ratingdropbtn.css";
// 학생이 보낸 내역 목록
// 진행, 완료 기능 만들고 후기 만드려고 미뤄둠

const Container = styled.div`
  width: 100%;
  /* 1rem = 16px */
  padding: 0.6rem;
  background-color: rgba(0,0,0,0);;
`;

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto 10fr 4fr 8fr);
  grid-template-rows: repeat(1fr);
  gap: 30px;
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
  width: 7%;
  text-align: center;
  align-items: center;
`;

const Cardelement2 = styled.div`
  border-left: 1px solid lightgrey;
  width: 50%;
  text-align: center;
  align-items: center;
`;

const Cardelement3 = styled.div`
  padding-top : 3%;
  width: 30%;
  text-align: right;
  flex-grow : 3;
  margin-right : 15%;
  align-items: center;
  color : grey;
`;

const Cardelement4 = styled.div`
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  width: 20%;
  text-align: center;
  flex-grow : 4;
`;


const Cardbutton = styled.button`
  border: none;
`;

const PostboxListSS = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getSend = async () => {
      const dataSSend = await axios.get(
        "http://localhost:8080/students/getAllSending",
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      );
      console.log(dataSSend.data);
      setData(dataSSend.data);
    };
    getSend();
  }, []);

  const deleteSend = tel => {
    console.log(tel);

    if (window.confirm("정말로 신청을 취소하시겠습니까?")) {
      axios.delete(
        `http://localhost:8080/students/deleteSending?teacher_tel=${tel}`,
        {
          headers: { "X-AUTH-TOKEN": localStorage.getItem("token") },
          data: { teacher_tel: tel },
        }
      );
      // .then(() => {
      //   window.location.reload(); // Add this to reload the page.
      // });
    }
  };

  return (
    <Container>
      <CardList>
        {data.map((element, index) => (
          <Card key={element.id}>
            <Cardelement1>{index + 1}</Cardelement1>
            <Cardelement2>
              <Link
                to={{
                  pathname: "/postboxdetailT",
                  state: {
                    name: element.receiver.name,
                    university: element.receiver.university,
                    major: element.receiver.major,
                    subject: element.receiver.subject,
                    region: element.receiver.region,
                    tel: element.receiver.tel,
                    career: element.receiver.career,
                    intro: element.receiver.intro,
                    plan: element.receiver.plan,
                  },
                }}
              >
                <Cardbutton>
                  {element.state === "신청서 제출" && (
                    <div>{element.receiver.name}님에게 보낸 신청입니다.</div>
                  )}
                  {element.state === "체결 완료" && (
                    <div>
                      {element.receiver.name}님에게 신청 - 진행중인 과외입니다.
                    </div>
                  )}
                  {element.state === "종료" && (
                    <div>
                      {element.receiver.name}님에게 신청 - 종료된 과외입니다.
                    </div>
                  )}
                </Cardbutton>
              </Link>
            </Cardelement2>
            <Cardelement3>
              <div>
              {element.create_date.split("T")[0]}
              <br></br>
              {element.create_date.split("T")[1]}
              </div>
            </Cardelement3>
            <Cardelement4>
              <Cardbutton onClick={() => deleteSend(element.receiver.tel)}>
                삭제
              </Cardbutton>
              {element.state == "체결 완료" && (
                <Ratingdropbtn tel={element.receiver.tel} />
              )}
            </Cardelement4>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default PostboxListSS;
