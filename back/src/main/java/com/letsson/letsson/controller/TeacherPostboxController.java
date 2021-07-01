package com.letsson.letsson.controller;

import com.letsson.letsson.model.*;
import com.letsson.letsson.repository.StoTRepository;
import com.letsson.letsson.repository.StudentRepository;
import com.letsson.letsson.repository.TeacherRepository;
import com.letsson.letsson.repository.TtoSRepository;
import com.letsson.letsson.response.BasicResponse;
import com.letsson.letsson.response.CommonResponse;
import com.letsson.letsson.response.ErrorResponse;
import com.letsson.letsson.security.JwtTokenProvider;
import com.letsson.letsson.service.StudentService;
import com.letsson.letsson.service.TeacherPostboxService;
import com.letsson.letsson.service.TeacherService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;


@Api(value="선생님 포스트 박스 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/teachers")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherPostboxController {
    private final JwtTokenProvider jwtTokenProvider;
    private final TeacherPostboxService teacherPostboxService;
    private final StudentService studentService;
    private final TeacherService teacherService;

    //선생님 to 학생 신청서 보내기
    @PostMapping("/sendProfile")
    @ApiOperation(value = "sendProfile", tags = "선생님 -> 학생 신청")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public ResponseEntity<? extends BasicResponse> sendProfile(HttpServletRequest request, @RequestParam(value="student_tel") String receiverTel){
        String senderTel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        Teacher senderTeacher = teacherService.findTeacher(senderTel);
        Student receiverStudent = studentService.findStudent(receiverTel);
        if(senderTeacher == null || receiverStudent == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("선생님 또는 학생이 존재하지 않습니다."));

        String message  = teacherPostboxService.sendProfile(receiverStudent,senderTeacher);
        if(message.equals("이미 신청서를 보냈습니다."))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(message));
        else
        {
            return ResponseEntity.ok().body(new CommonResponse<String>(message));
        }

    }
    //선생님 -> 학생 신청서 삭제
    @DeleteMapping("/deleteSending")
    @ApiOperation(value = "deleteSending", tags = "선생님 -> 학생 신청 삭제")
    @ApiImplicitParams(
            {
                   // @ApiImplicitParam(name = "receiverTel", value = "신청 대상 학생 전화번호", dataType = "String", required = true, paramType = "query"),
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public ResponseEntity<? extends BasicResponse> deleteSending(@RequestParam(value="student_tel") String student_tel,HttpServletRequest request){
        Student student = studentService.findStudent(student_tel);
        Teacher teacher = teacherService.findTeacher(jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request)));
        if(student == null || teacher == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("선생님 또는 학생이 존재하지 않습니다."));

        System.out.println("receiver: " + student.getId());
        System.out.println("sender: " + teacher.getId());

      String message =  teacherPostboxService.deleteSending(teacher,student);
      if(message.equals("존재하지 않는 신청서 입니다."))
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(message));
      return ResponseEntity.ok().body(new CommonResponse<String>(message));

    }

    //선생님 -> 학생 신청서 전체 조회
    @GetMapping("/getAllSending")
    @ApiOperation(value = "getAllSending", tags = "선생님 -> 학생 신청서 전체 조회")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public List<TtoSMatching> getAllSending (HttpServletRequest request){

        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        return teacherPostboxService.getAllSending(tel);
    }

    //학생 -> 선생님 신청서 전체 조회
    @GetMapping("/getAllReceiving")
    @ApiOperation(value = "getAllSending", tags = "학생 -> 선생님 신청서 전체 조회")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public  List<StoTMatching> getAllReceiving (HttpServletRequest request){
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        return teacherPostboxService.getAllReceiving(tel);
    }

    @PostMapping("/makeLetsson")
    @ApiOperation(value = "makeLetsson", tags = "학생->선생님 신청 체결(선생님이 승낙)")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public  ResponseEntity<? extends BasicResponse> makeLetsson(@RequestParam(value="student_tel") String student_tel,HttpServletRequest request)
    {
        Student student = studentService.findStudent(student_tel);
        Teacher teacher = teacherService.findTeacher(jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request)));
        System.out.println("receiver: " + student.getId());
        System.out.println("sender: " + teacher.getId());
        if(student == null || teacher == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("선생님 또는 학생이 존재하지 않습니다."));
        String message = teacherPostboxService.makeLetsson(student,teacher);
        if(message.equals("이미 체결되었습니다."))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(message));
        if(message.equals("존재하지 않는 신청서 입니다."))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(message));
        this.teacherService.makeLetsson(teacher);
        return ResponseEntity.ok().body(new CommonResponse<String>(student.getTel()+","+ teacher.getTel()+"체결 완료!"));
    }

}
