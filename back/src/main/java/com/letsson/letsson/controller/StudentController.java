package com.letsson.letsson.controller;

import com.letsson.letsson.model.Student;
import com.letsson.letsson.model.StudentJoinDto;
import com.letsson.letsson.model.LoginDto;
import com.letsson.letsson.response.BasicResponse;
import com.letsson.letsson.response.CommonResponse;
import com.letsson.letsson.response.ErrorResponse;
import com.letsson.letsson.security.JwtTokenProvider;
import com.letsson.letsson.service.CustomUserDetailsService;
import com.letsson.letsson.service.StudentService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(value="학생 API")
@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final StudentService studentService;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    @PostMapping("/join")
    @ApiOperation(value="join",tags = "학생 회원 가입")
    public ResponseEntity<? extends BasicResponse> join(@ApiParam(name="Student",value = "수정 학생 정보",required = true) @Valid @RequestBody StudentJoinDto studentJoinDto, BindingResult bindingResult) {
       if(bindingResult.hasErrors()) {
            bindingResult.getAllErrors()
                    .forEach(objectError->{ System.err.println("code : " + objectError.getCode());
                                            System.err.println("defaultMessage : " + objectError.getDefaultMessage());
                                            System.err.println("objectName : " + objectError.getObjectName());
                    });
           /*return new ErrorResponse("valid error");*/
        }
       String message = studentService.signUp(studentJoinDto);
       if(message == "사용불가한 아이디") {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body(new ErrorResponse("사용 불가한 아이디 입니다."));
       }
       else if(message == null)
       {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body(new ErrorResponse("회원 가입 실패"));
       }
       else{
           return ResponseEntity.ok().body(new CommonResponse<String>(message));
       }

    }

    //id(tel) 중복 검증
    @GetMapping("/idCheck")
    @ApiOperation(value="confirmTel",tags="아이디 중복 체크")
    @ApiImplicitParams(
            @ApiImplicitParam(name="tel",value="학생 입력 전화번호",dataType = "String",required = true, paramType = "query")
    )
    public Map<String, Object> confirmTel(@RequestParam("tel") String tel) throws Exception{
        boolean result = customUserDetailsService.confirmTel(tel);
        Map<String,Object> data = new HashMap<>();
        if(result == true){
            System.out.println("핸드폰 번호 사용 불가!");
            data.put("confirm","아이디 중복");
        }
        else{
            System.out.println("핸드폰 번호 사용 가능!");
            data.put("confirm","사용가능한 아이디입니다.");
        }
        return data;
    }

    // 로그인
    @PostMapping("/login")
    @ApiOperation(value="login",tags="학생 로그인")
    public String login(@ApiParam(name="Student",value = "로그인 학생 정보",required = true) @RequestBody LoginDto loginDto) {
        Student member = studentService.findStudent(loginDto.getTel());
        if(member == null) throw new IllegalArgumentException("가입되지 않은 tel 입니다");
        if (!(passwordEncoder.matches(loginDto.getPassword(), member.getPassword()))) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return jwtTokenProvider.createToken(member.getUsername(), member.getRole());
    }

    @GetMapping("/studentInfo")
    @ApiOperation(value="getStudentById",tags="등록 id에 해당하는 학생 정보")
    @ApiImplicitParams(
            {
            @ApiImplicitParam(name="X-AUTH-TOKEN",value="authorization header",required = true,dataType = "string",paramType = "header")}
    )
    public ResponseEntity<? extends BasicResponse> getStudentById(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));

        Student student = studentService.findStudent(tel);
        if(student != null)
           {
               return ResponseEntity.ok().body(new CommonResponse<Student>(student));
           }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("일치하는 회원 정보가 없습니다. 사용자 id를 확인해주세요."));

    }

    @PutMapping("/basicModify")
    @ApiOperation(value="updateBasicStudent",tags="등록 id에 해당하는 학생 기본 정보 수정")
    @ApiImplicitParams(
            {
             @ApiImplicitParam(name="X-AUTH-TOKEN",value="authorization header",required = true,dataType = "string",paramType = "header")}
    )
    public ResponseEntity<? extends BasicResponse> updateBasicStudent(@ApiParam(name="Student",value = "등록 학생 정보",required = true) @RequestBody StudentJoinDto student, HttpServletRequest request)
    {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        Student existingStudent = studentService.findStudent(tel);
        if(existingStudent == null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 회원 정보가 없습니다."));
        }
        Student saveStudent =  studentService.updateBasicStudent(existingStudent,student);
        if(saveStudent == null)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("기본 정보 수정 실패"));

        }
        return ResponseEntity.ok().body(new CommonResponse<Student>(saveStudent));
    }

    @PutMapping("/modify")
    @ApiOperation(value="updateStudent",tags="등록 id에 해당하는 학생 정보 수정")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name="X-AUTH-TOKEN",value="authorization header",required = true,dataType = "string",paramType = "header")}
    )
    public ResponseEntity<? extends BasicResponse> updateStudent(@ApiParam(name="Student",value = "등록 학생 정보",required = true) @RequestBody StudentJoinDto student, HttpServletRequest request) throws IOException {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        Student existingStudent = studentService.findStudent(tel);
        if(existingStudent == null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 회원 정보가 없습니다."));
        }
        Student saveStudent =  studentService.updateStudent(existingStudent,student);
        if(saveStudent == null)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("회원 정보 수정 실패"));

        }
        return ResponseEntity.ok().body(new CommonResponse<Student>(saveStudent));

    }

    @ApiOperation(value="profileImg",tags="학생 프로필 이미지 등록")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name="X-AUTH-TOKEN",value="authorization header",required = true,dataType = "string",paramType = "header")}
    )
    @PostMapping("/profileImg")
    public String updateProfileImg(HttpServletRequest request,@RequestParam("file")MultipartFile profileImg) throws IOException
    {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        String basePath = "back/student/photo";
        studentService.addProfileImgWithS3(profileImg,basePath,tel);

        return "사진 저장 완료";
    }

    // 초기 이미지로 변경(delete)
    @ApiOperation(value = "basicImg", tags = "학생 프로필 기본 이미지로 변경")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")}
    )
    @PostMapping("/basicImg")
    public ResponseEntity<? extends BasicResponse> deleteProfileImg(HttpServletRequest request) throws IOException {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        String basePath = "back/student/photo";
        try {
            studentService.basicImgWithS3(tel,basePath);
            return ResponseEntity.ok().body(new CommonResponse<String>("basic 사진으로 변경"));

        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage()));
        }

    }


    // delete student by id
    @DeleteMapping("/delete")
    @ApiOperation(value="deleteStudent",tags="등록 id에 해당하는 학생 정보 삭제")
    @ApiImplicitParams(
            {
            @ApiImplicitParam(name="X-AUTH-TOKEN",value="authorization header",required = true,dataType = "string",paramType = "header")}
    )
    public ResponseEntity<Student> deleteStudent(HttpServletRequest request) {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        this.studentService.deleteStudent(tel);
        return ResponseEntity.ok().build();
    }








}
