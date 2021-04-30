package com.letsson.letsson.controller;

import com.letsson.letsson.model.Student;
import com.letsson.letsson.model.Teacher;
import com.letsson.letsson.repository.StudentRepository;
import com.letsson.letsson.repository.TeacherRepository;
import com.letsson.letsson.response.BasicResponse;
import com.letsson.letsson.response.CommonResponse;
import com.letsson.letsson.response.ErrorResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Api(value = "사용자 공통 API")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;



    @GetMapping("/findID")
    @ApiOperation(value = "findID",tags = "사용자 아이디 찾기")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name="email",value="사용자 입력 이메일 주소",dataType = "String",required = true, paramType = "query"),
                    @ApiImplicitParam(name="name",value="사용자 입력 이름",dataType = "String",required = true, paramType = "query")
            }
    )
    public ResponseEntity<? extends BasicResponse> findId(@RequestParam("name") String name, @RequestParam("email") String email){
        if(studentRepository.findByEmailAndName(email,name) != null){
            Student existingStudent = studentRepository.findByEmailAndName(email,name);
            return ResponseEntity.ok().body( new CommonResponse<String>(existingStudent.getTel()));
        }
        else if(teacherRepository.findByEmailAndName(email,name) != null) {
            Teacher existingTeacher = teacherRepository.findByEmailAndName(email, name);
            return ResponseEntity.ok().body(new CommonResponse<String>(existingTeacher.getTel()));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("존재하지 않는 사용자입니다."));
        }
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

        if(studentRepository.findByTelAndName(tel,name) != null){
            return true;
        }
        else if(teacherRepository.findByTelAndName(tel,name) != null){
          return true;
        }
        else return false;

    }
    @PutMapping("/resetPassword")
    @ApiOperation(value="resetPassword",tags="비밀 번호 수정")
    public ResponseEntity<? extends BasicResponse> resetStudentPassword(@RequestParam("tel") String tel, @RequestParam("password")String password)
    {
        if(studentRepository.findByTel(tel) != null)
        {
            Student existingStudent = this.studentRepository.findByTel(tel);
            existingStudent.setPassword(passwordEncoder.encode(password));

            Student saveStudent =  this.studentRepository.save(existingStudent);
            if(saveStudent == null)
            {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ErrorResponse("비밀번호 수정 실패"));

            }
            return ResponseEntity.ok().body(new CommonResponse<Student>(saveStudent));
        }
        else if(teacherRepository.findByTel(tel) != null) {
            Teacher existingTeacher = this.teacherRepository.findByTel(tel);
            existingTeacher.setPassword(passwordEncoder.encode(password));

            Teacher saveTeacher = this.teacherRepository.save(existingTeacher);
            if (saveTeacher == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ErrorResponse("비밀번호 수정 실패"));

            }
            return ResponseEntity.ok().body(new CommonResponse<Teacher>(saveTeacher));

        }

        else
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("존재하지 않는 핸드폰 번호 비밀번호 수정 실패"));
        }
    }






}

