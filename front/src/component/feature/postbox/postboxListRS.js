import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link,  } from "react-router-dom";
import postboxbackg from "./postboxbackg.jpg";

// 학생이 받은 내역 목록

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
  padding-left: 0px;
  border-radius: 10px;

  @media only screen and (max-width: 680px) {
    margin-top: 10%;
  }
`;

const Card = styled.li`
  border-top: 2px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  background-color: white;
  color: black;
  box-shadow: 3px 3px lightgrey;
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

// const Cardelement4 = styled.div`
//   border-left: 1px solid lightgrey;
//   border-right: 1px solid lightgrey;
//   width: 20%;
//   text-align: center;
//   flex-grow: 4;
// `;

const Cardbutton = styled.button`
  border: none;
`;

const PostboxListRS = () => {
  const [data, setData] = useState([]);
  // const [connect, setConnect] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    async function getRecieve() {
      try {
        const dataSRecieve =  await axios
              .get("http://localhost:8080/students/getAllReceiving", {
                headers: {
                  "X-AUTH-TOKEN": localStorage.getItem("token"),
                },
              });
        setData(dataSRecieve.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getRecieve();
  }, []);

  // const deleteSend = tel => {
  //   console.log(tel);

  //   if (window.confirm("정말로 받은 신청을 삭제하겠습니까?")) {
  //     axios
  //       .delete("http://localhost:8080/teachers/deleteSending", {
  //         data: { student_tel: tel },
  //         headers: { "X-AUTH-TOKEN": localStorage.getItem("token") },
  //       })
  //       .then(response => {
  //         history.go(0);
  //         alert("삭제 되었습니다.");
  //       })
  //       .catch(err => {
  //         console.log(err.response);
  //       });
  //   }
  // };

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
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default PostboxListRS;
