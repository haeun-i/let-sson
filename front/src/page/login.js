import React from "react";
import { Link } from 'react-router-dom';
import HeadButton from "../component/layout/header/header"
import styled from "styled-components";

const Wrapper = styled.div`
    margin: 0;   
    padding : 0; 
    width:100%;
    height:100vh;
    box-sizing: border-box;
    background-color : #F6F4F3;
    padding-top : 30px;
`;
const Log = styled.form`
    display : relative;
    background-color :white;
    position: absolute;
    width: 400px; 
    height: 180px; 
    margin-left: -200px; 
    margin-top: -90px; 
    left: 50%; 
    top: 43%; 
    padding-top : 30px;
    display : flex;
    flex-direction: column;
    justify-content: center;
    border : solid 1px black;
`;
const LogText1 = styled.span`
    text-align : right;
    padding-right : 30px;
    margin-left : 35px;
`;

const LogText2 = styled.span`
    text-align : right;
    padding-right : 45px;
    margin-left : 35px;
`;

const LogInput = styled.input`
    background-color : white;
    border : solid 1px black;
    margin-right : 0;
    width : 55%;
    height : 100%;
`;

const LogBtns = styled.div`
    margin-top: 10px;
    margin-left : 3%;
`;

const LogBtn = styled.input`
    height:50px;
    color: white;
    padding-left : 150px;
    padding-right : 150px;
    border-radius : 50px;
    font-size: 16px;
    border: none;
    margin-top : 20px;
    margin-left : 30px;
    margin-right: 30px;
    background: linear-gradient(to right, rgba(104,104,104,1) 18%,rgba(43,62,104,1) 70%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#686868', endColorstr='#2b3e68',GradientType=1 ); /* IE6-9 */
`;


const Notlog1 = styled.div`
    width:100%;
    position: absolute;
    display : flex;
    align-items: center;
    top: 80%; 
    margin-left : 10%;
    margin-top : 75px;
`;

const Notlog2 = styled.div`
    width:100%;
    position: absolute;
    display : flex;
    align-items: center;
    margin-left : 12%;
    top: 90%; 
    margin-top : 95px;
`;

const NotlogText = styled.div`
    display : inline;
`;
const NotlogBtn = styled.button`
    background-color : #F6F4F3;
    height : 10px;
    text-decoration:underline #010440;
    text-underline-position: under;
`;

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = { phone: "", password: "" };
    };
    PhoneInput = (e) =>{
        this.setState( {phone : e.target.value} )
    }
    PasswordInput = (e) =>{
        this.setState( {password : e.target.value} )
    }
    Loged = (e) => {
        console.log(this.state.phone);
        console.log(this.state.password);
    }

    Deleted = (e) => {
        console.log("로그인 취소");
    }
    
    render(){
        return(
            <div>
                <HeadButton />
                <Wrapper>
                    <Log>
                            <label className="phoneNum">
                                <LogText1>휴대폰번호</LogText1>
                                <LogInput type="text" onChange={this.PhoneInput} placeholder="숫자만 입력"></LogInput>
                            </label>
                            <br></br>
                            <label className="password">
                                <LogText2>비밀번호</LogText2>
                                <LogInput type="password" onChange={this.PasswordInput} placeholder="8글자 이상"></LogInput>
                            </label>  

                            <LogBtns>
                                <Link to="/loginsuccess">
                                    <LogBtn type="submit" onClick={this.Loged} value="확인"></LogBtn>
                                </Link>
                            </LogBtns>


                        <Notlog1>
                            <NotlogText>계정이 없으시다면?</NotlogText>
                            <Link to="/stusign">
                                <NotlogBtn>학생가입</NotlogBtn>
                            </Link>
                            <Link to="/teasign">
                                <NotlogBtn>선생님가입</NotlogBtn>
                            </Link>
                        </Notlog1>
                        <Notlog2>
                            <NotlogText>비밀번호를 잊으셨다면?</NotlogText>
                            <Link to="/findpassword">
                                <NotlogBtn>비밀번호찾기</NotlogBtn>
                            </Link> 
                        </Notlog2>
                    </Log>
                </Wrapper>
            </div>
        );
    }
}

export default Login;