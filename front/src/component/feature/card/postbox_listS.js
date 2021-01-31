import React from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  /* 1rem = 16px */
  padding: 0.6rem;
`;

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Card = styled.li`
  background-color: gray;
  color: white;
  display: flex;
  flex-direction: column;
`;

class PostboxList extends React.Component {
  state = {
    data: [
      {
        id: 1129300128,
        name: "000선생님",
        period: "기간:2021.1~",
      },
      {
        id: 1120128,
        name: "000학생",
        period: "기간:2021.2~",
      },
      {
        id: 29300128,
        name: "윤상석",
        period: "기간:2021.3~",
      },
      {
        id: 29300128,
        name: "윤상석",
        period: "기간:2021.3~",
      },
      {
        id: 29300128,
        name: "윤상석",
        period: "기간:2021.3~",
      },
      {
        id: 29300128,
        name: "윤상석",
        period: "기간:2021.3~",
      },
      {
        id: 29300128,
        name: "윤상석",
        period: "기간:2021.3~",
      },
      {
        id: 29300128,
        name: "윤상석",
        period: "기간:2021.3~",
      },
    ],
  };

  getData = async () => {
    const data = await axios.get("https://google.com");
    this.setState(data);
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Container>
        <CardList>
          {this.state.data.map((element) => (
            <Card key={element.id}>
              <span>{element.name}</span>
              <span>{element.period}</span>
              <button>자세히 보기</button>
            </Card>
          ))}
        </CardList>
      </Container>
    );
  }
}

export default PostboxList;