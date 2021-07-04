package com.letsson.letsson.controller;

import com.letsson.letsson.model.LoginDto;
import com.letsson.letsson.model.Teacher;
import com.letsson.letsson.model.TeacherJoinDto;
import com.letsson.letsson.response.BasicResponse;
import com.letsson.letsson.response.CommonResponse;
import com.letsson.letsson.response.ErrorResponse;
import com.letsson.letsson.security.JwtTokenProvider;
import com.letsson.letsson.service.CustomUserDetailsService;
import com.letsson.letsson.service.TeacherService;
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

@Api(value="선생님 API")
@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final TeacherService teacherService;
    private final CustomUserDetailsService customUserDetailsService;


    @PostMapping("/join")
    @ApiOperation(value = "join", tags = "선생님 회원 가입")
    public ResponseEntity<? extends BasicResponse> join(@ApiParam(name = "TeacherJoinDto", value = "등록 선생님 정보", required = true) @RequestBody @Valid TeacherJoinDto teacherJoinDto, BindingResult bindingResult) throws IOException {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors()
                    .forEach(objectError -> {
                        System.err.println("code : " + objectError.getCode());
                        System.err.println("defaultMessage : " + objectError.getDefaultMessage());
                        System.err.println("objectName : " + objectError.getObjectName());
                    });
           /* return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ErrorResponse("valid error"));*/
        }
        String message = teacherService.signUp(teacherJoinDto);
        if (message == "사용불가한 아이디") {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("사용 불가한 아이디 입니다."));
        } else if (message == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("회원 가입 실패"));
        } else {
            return ResponseEntity.ok().body(new CommonResponse<String>(message));
        }
    }

    //id(tel) 중복 검증
    @GetMapping("/idCheck")
    @ApiOperation(value = "confirmTel", tags = "아이디 중복 체크")
    @ApiImplicitParams(
            @ApiImplicitParam(name = "tel", value = "선생님 입력 전화번호", dataType = "String", required = true, paramType = "query")
    )
    public Map<String, Object> confirmTel(@RequestParam("tel") String tel) throws Exception {
        boolean result = customUserDetailsService.confirmTel(tel);

        Map<String, Object> data = new HashMap<>();
        if (result == true) {
            System.out.println("핸드폰 번호 사용 불가!");
            data.put("confirm", "아이디 중복");
        } else {
            System.out.println("핸드폰 번호 사용 가능!");
            data.put("confirm", "사용가능한 아이디입니다.");
        }
        return data;
    }

    //로그인
    @PostMapping("/login")
    @ApiOperation(value = "login", tags = "선생님 로그인")
    public String login(@ApiParam(name = "Teacher", value = "로그인 선생님 정보", required = true) @RequestBody LoginDto loginDto) {
        Teacher member = teacherService.findTeacher(loginDto.getTel());
        if (member == null) throw new IllegalArgumentException("가입되지 않은 tel 입니다");
        if (!(passwordEncoder.matches(loginDto.getPassword(),member.getPassword()))) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return jwtTokenProvider.createToken(member.getUsername(), member.getRole());
    }


    //get teacher by id
    @GetMapping("/teacherInfo")
    @ApiOperation(value = "getTeacherById", tags = "등록 id에 해당하는 선생님 정보")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public ResponseEntity<? extends BasicResponse> getTeacherById(HttpServletRequest request) {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        Teacher teacher = this.teacherService.findTeacher(tel);
        if (teacher != null) {
            return ResponseEntity.ok().body(new CommonResponse<Teacher>(teacher));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 회원 정보가 없습니다. 사용자 id를 확인해주세요."));
        }


    }

    @PutMapping("/basicModify")
    @ApiOperation(value = "updateBasicTeacher", tags = "등록 id에 해당하는 선생님 기본 정보 수정")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")}
    )
    public ResponseEntity<? extends BasicResponse> updateBasicTeacher(@ApiParam(name = "Teacher", value = "수정 선생님 정보", required = true) @RequestBody TeacherJoinDto teacher, HttpServletRequest request) {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        Teacher existingTeacher = this.teacherService.findTeacher(tel);
        if (existingTeacher == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 회원 정보가 없습니다."));
        }
        Teacher saveTeacher = this.teacherService.updateBasicTeacher(existingTeacher,teacher);
        if (saveTeacher == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("기본 정보 수정 실패"));

        }
        return ResponseEntity.ok().body(new CommonResponse<Teacher>(saveTeacher));

    }

    //update teacher by id..mail,name,location update..
    @PutMapping("/modify")
    @ApiOperation(value = "updateTeacher", tags = "등록 id에 해당하는 선생님 정보 수정")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")}
    )
    public ResponseEntity<? extends BasicResponse> updateTeacher(@ApiParam(name = "Teacher", value = "수정 선생님 정보", required = true) @RequestBody TeacherJoinDto teacher, HttpServletRequest request) throws IOException {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        Teacher existingTeacher = teacherService.findTeacher(tel);
        if (existingTeacher == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 회원 정보가 없습니다."));
        }
        Teacher saveTeacher = teacherService.updateTeacher(existingTeacher,teacher);
        if (saveTeacher == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("회원 정보 수정 실패"));

        }
        return ResponseEntity.ok().body(new CommonResponse<Teacher>(saveTeacher));
    }

    @ApiOperation(value = "proveImg", tags = "해당 선생님 신분 인증 사진")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")}
    )
    @PostMapping("/proveImg")
    public String resisterProfileImg(HttpServletRequest request, @RequestParam("file") MultipartFile proveImg) throws IOException {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        String basePath = "back/teacher/provePhoto";
        String fileName = proveImg.getOriginalFilename();

        /*
        if (profileImg.isEmpty()) return "redirect:/teacher/modify";
        if (fileName.equals("stranger.png") || fileName.equals("default.png")) {
            throw new RuntimeException("Invalid file name");
        }*/

        teacherService.addProfileImgWithS3(proveImg, basePath, tel);

        return "사진 저장 완료";
    }


    @ApiOperation(value = "profileImg", tags = "해당 선생님 프로필 이미지 등록")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")}
    )
    @PostMapping("/profileImg")
    public String updateProfileImg(HttpServletRequest request, @RequestParam("file") MultipartFile profileImg) throws IOException {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        String basePath = "back/teacher/photo";
        String fileName = profileImg.getOriginalFilename();

        /*
        if (profileImg.isEmpty()) return "redirect:/teacher/modify";
        if (fileName.equals("stranger.png") || fileName.equals("default.png")) {
            throw new RuntimeException("Invalid file name");
        }*/

        teacherService.addProfileImgWithS3(profileImg, basePath, tel);

        return "사진 저장 완료";
    }


    //delete teacher by id
    @DeleteMapping("/delete")
    @ApiOperation(value = "deleteTeacher", tags = "등록 id에 해당하는 선생님 정보 삭제")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")}
    )
    public ResponseEntity<Teacher> deleteTeacher(HttpServletRequest request) {
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        this.teacherService.deleteTeacher(tel);
        return ResponseEntity.ok().build();

    }

}