import React from "react";
// import styled from "styled-components";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";

// const clickButton = styled.button`
//   border: red;

// `;
class Ratingdropbtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  sendRating() {
    console.log(this.state.rating);
    console.log(this.props.tel);
    if (
      window.confirm(`정말로 선생님께 ${this.state.rating} 점을 주시겠습니까?`)
    ) {
      axios
        .put(
          `http://localhost:8080/students/rating?grade=${this.state.rating}&teacher_tel=${this.props.tel}`,
          {
            grade: this.state.rating,
            teacher_tel: this.props.tel,
          },
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        )
        .then(response => {})
        .catch(err => {
          console.log(err.response);
        });
    }
  }

  render() {
    const { rating } = this.state;

    return (
      <div className="dropdown">
        <button className="dropbtn">후기</button>
        <div className="dropdown-content">
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          <button onClick={this.sendRating.bind(this)}>전송</button>
        </div>
      </div>
    );
  }
}

export default Ratingdropbtn;
