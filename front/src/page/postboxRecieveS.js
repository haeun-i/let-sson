import React from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import PostboxListRS from "../component/feature/postbox/postboxListRS";
import successbackg from "./successbackg.jpg";
// 학생이 받은 내역

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

class PostboxRecieveS extends React.Component{
    render(){
        return(
            <div>
                <HeadButtons/>
            <Wrapper>
                <PostboxListRS/>
            </Wrapper>
            </div>
        )
    }
}


export default PostboxRecieveS;