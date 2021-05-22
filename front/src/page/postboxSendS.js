import React from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import PostboxListSS from "../component/feature/postbox/postboxListSS";
import successbackg from "./successbackg.jpg";
// 학생이 보낸 내역

const Wrapper = styled.div`
position: absolute;
width: 100%;
height: 90%;
display: flex;
flex-direction: column;
justify-content: center;
background-image: url(${successbackg});
background-size: cover;
`
const Text2 = styled.div`
  margin-left: 25%;
  margin-right: 60%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

class PostboxSendS extends React.Component{
    render(){
        return(
            <div>
                <HeadButtons/>
            <Wrapper>
                <Text2>
                    <hr color="#0D00A4" width="45px" height="10px"></hr>
                    <Blue>학생</Blue> 페이지
                </Text2>
                <PostboxListSS/>
            </Wrapper>
            </div>
        )
    }
}


export default PostboxSendS;