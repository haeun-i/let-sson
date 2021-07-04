import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import postboxbackg from "./postboxbackg.jpg";
// 선생이 보낸 내역 목록

const Circle1 = styled.div`
  position: absolute;
  background-position: center;
  background-size: cover;
  margin-top: 25%;
  margin-left: 79%;
  text-align: center;
  line-height: 200px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  font-weight: bold;
  font-weight: bold;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
`;

const Circle2 = styled.div`
  position: absolute;
  background-position: center;
  background-size: cover;
  margin-top: 10%;
  margin-left: 9%;
  text-align: center;
  line-height: 200px;
  box-shadow: -90px -90px #f3f2fc;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #8983d2;
  color: white;
`;

const Container = styled.div`
  width: 100%;
  /* 1rem = 16px */
  padding: 0.6rem;
  padding-top: 10%;
  background-image: url(${postboxbackg});
  background-size: cover;
  background-color: rgba(0, 0, 0, 0); ;
`;

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto 10fr 4fr 8fr);
  grid-template-rows: repeat(1fr);
  gap: 30px;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 10px;
  padding-left: 0px;
  @media only screen and (max-width: 680px) {
    margin-top: 10%;
  }
`;

const Card = styled.li`
  box-shadow: 3px 3px lightgrey;
  border-top: 2px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
`;

const Cardelement1 = styled.div`
  padding-top: 2.5%;
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
  padding-top: 1.5%;
  width: 30%;
  text-align: right;
  flex-grow: 3;
  margin-right: 5%;
  align-items: center;
  color: grey;
`;

const Cardelement4 = styled.div`
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  width: 20%;
  text-align: center;
  flex-grow: 4;
`;

const Cardbutton = styled.button`
  border: none;
`;

const PostboxListST = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getSend = async () => {
      const dataTSend = await axios
        .get("http://localhost:8080/teachers/getAllSending", {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        })
        .then(response => {
          console.log(dataTSend.data);
          setData(dataTSend.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    };
    getSend();
  }, []);

  const deleteSend = tel => {
    console.log(tel);

    if (window.confirm("정말로 신청을 취소하시겠습니까?")) {
      axios
        .delete(
          `http://localhost:8080/teachers/deleteSending?student_tel=${tel}`,
          {
            headers: { "X-AUTH-TOKEN": localStorage.getItem("token") },
            data: { student_tel: tel },
          }
        )
        .then(response => {
          alert("삭제 되었습니다. 페이지를 재접속하면 반영됩니다");
        })
        .catch(err => {
          console.log(err.response);
        });
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
                  pathname: "/postboxdetailS",
                  state: {
                    name: element.receiver.name,
                    period: element.receiver.period,
                    name: element.receiver.name,
                    region: element.receiver.region,
                    tel: element.receiver.tel,
                    intro: element.receiver.intro,
                    goal: element.receiver.goal,
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
              {element.create_date !== null && (
                <div>
                  {element.create_date.split("T")[0]}
                  <br></br>
                  {element.create_date.split("T")[1].substr(0, 8)}
                </div>
              )}
            </Cardelement3>
            <Cardelement4>
              <Cardbutton onClick={() => deleteSend(element.receiver.tel)}>
                삭제
              </Cardbutton>
            </Cardelement4>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default PostboxListST;
