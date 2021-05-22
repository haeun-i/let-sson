import React from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import PostboxListST from "../component/feature/postbox/postboxListST";
import successbackg from "./successbackg.jpg";
// 선생이 보낸 내역

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

class PostboxSendT extends React.Component{
    render(){
        return(
            <div>
                <HeadButtons/>
            <Wrapper>
                <PostboxListST/>
            </Wrapper>
            </div>
        )
    }
}


export default PostboxSendT;