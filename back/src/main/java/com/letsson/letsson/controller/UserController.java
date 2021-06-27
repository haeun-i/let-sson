package com.letsson.letsson.controller;
import com.letsson.letsson.response.BasicResponse;
import com.letsson.letsson.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "사용자 공통 API")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;



    @GetMapping("/findID")
    @ApiOperation(value = "findID",tags = "사용자 아이디 찾기")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name="email",value="사용자 입력 이메일 주소",dataType = "String",required = true, paramType = "query"),
                    @ApiImplicitParam(name="name",value="사용자 입력 이름",dataType = "String",required = true, paramType = "query")
            }
    )
    public ResponseEntity<? extends BasicResponse> findId(@RequestParam("name") String name, @RequestParam("email") String email){
        return userService.findId(email,name);
    }

    @GetMapping("/findPassword")
    @ApiOperation(value = "findPassword",tags = "사용자 비밀번호 찾기")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name="tel",value="사용자 입력 핸드폰 번호",dataType = "String",required = true, paramType = "query"),
                    @ApiImplicitParam(name="name",value="사용자 입력 이름",dataType = "String",required = true, paramType = "query")
            }
    )
    public boolean findPassword(@RequestParam("name") String name,@RequestParam("tel") String tel){

      return userService.findPassword(name,tel);
    }
    
    @PutMapping("/resetPassword")
    @ApiOperation(value="resetPassword",tags="비밀 번호 수정")
    public ResponseEntity<? extends BasicResponse> resetStudentPassword(@RequestParam("tel") String tel, @RequestParam("password")String password)
    {
      return  userService.resetStudentPassword(tel,password);
    }






}

