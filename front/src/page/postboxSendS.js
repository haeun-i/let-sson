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

class PostboxSendS extends React.Component{
    render(){
        return(
            <div>
                <HeadButtons/>
            <Wrapper>
                <PostboxListSS/>
            </Wrapper>
            </div>
        )
    }
}


export default PostboxSendS;