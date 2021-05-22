import React from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import PostboxListRT from "../component/feature/postbox/postboxListRT";
import successbackg from "./successbackg.jpg";
// 선생이 받은 내역

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

class PostboxRecieveT extends React.Component{
    render(){
        return(
            <div>
                <HeadButtons/>
            <Wrapper>
                <PostboxListRT />
            </Wrapper>
            </div>
        )
    }
}


export default PostboxRecieveT;