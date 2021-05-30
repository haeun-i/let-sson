import React from "react";
import HeadButtons from "../component/layout/header/header";
import styled from "styled-components";
import PostboxListRT from "../component/feature/postbox/postboxListRT";
import postboxbackg from "./postboxbackg.jpg";
// 선생이 받은 내역

const Wrapper = styled.div`
position: absolute;
height : 100vh;
width: 100%;
flex-direction: column;
justify-content: center;
background-image: url(${postboxbackg});
background-size: cover;
`

const Blue = styled.span`
  color: #0d00a4;
`;

const Text2 = styled.div`
    position : absolute;
  margin-left: 18%;
  margin-right: 60%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

class PostboxRecieveT extends React.Component{
    render(){
        return(
            <div>
                <HeadButtons/>
                <Wrapper>
                    <Text2>
                        <hr color="#0D00A4" width="45px" height="10px"></hr>
                        <Blue>받은</Blue> 내역함
                    </Text2>
                    <PostboxListRT/>
                </Wrapper>
            </div>
        )
    }
}


export default PostboxRecieveT;