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
import com.letsson.letsson.service.StudentPostboxService;
import com.letsson.letsson.service.StudentService;
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
import java.util.Date;
import java.util.List;

@Api(value="학생 포스트 박스 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentPostboxController {
   private final StudentService studentService;
   private final TeacherService teacherService;

   private final StudentPostboxService studentPostboxService;
   private final JwtTokenProvider jwtTokenProvider;



   //학생 to 선생님 신청서 보내기
    @PostMapping("/sendProfile")
    @ApiOperation(value = "sendProfile", tags = "학생->선생님 신청")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public ResponseEntity<? extends BasicResponse>  sendProfile(HttpServletRequest request, @RequestParam(value="teacher_tel") String receiverTel){

       String senderTel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
       Student senderStudent = studentService.findStudent(senderTel);
       Teacher receiverTeacher = teacherService.findTeacher(receiverTel);
       if(receiverTeacher == null || senderStudent == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("선생님 또는 학생이 존재하지 않습니다."));
       String message = studentPostboxService.sendProfile(senderStudent,receiverTeacher);
        if(message.equals("이미 신청서를 보냈습니다."))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(message));
        else
        {
            return ResponseEntity.ok().body(new CommonResponse<String>(message));
        }
    }



    //학생 -> 선생님 신청서 삭제
    @DeleteMapping("/deleteSending")
    @ApiOperation(value = "deleteSending", tags = "학생->선생님 신청 삭제")
    @ApiImplicitParams(
            {
                   // @ApiImplicitParam(name = "receiverTel", value = "신청 대상 선생님 전화번호", dataType = "String", required = true, paramType = "query"),
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public ResponseEntity<? extends BasicResponse> deleteSending(@RequestParam(value="teacher_tel") String teacher_tel,HttpServletRequest request)
    {

        Teacher teacher = teacherService.findTeacher(teacher_tel);
        Student student =studentService.findStudent(jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request)));
        if(student == null || teacher == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("선생님 또는 학생이 존재하지 않습니다."));
        System.out.println("receiver: " + teacher.getId());
        System.out.println("sender: " + student.getId());



        String message = studentPostboxService.deleteSending(student,teacher);
        if(message.equals("존재하지 않는 신청서 입니다."))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(message));
        return ResponseEntity.ok().body(new CommonResponse<String>(message));
    }

   /* @PutMapping("/makeLetsson")
    @ApiOperation(value = "makeLetsson", tags = "선생님->학생 신청 체결(학생이 승낙)")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public String makeLetsson(@RequestParam(value="teacher_tel") String teacher_tel,HttpServletRequest request)
    {
        Teacher teacher = teacherRepository.findByTel(teacher_tel);
        System.out.println("receiver: " + teacher.getId());

        Student student = studentRepository.findByTel(jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request)));
        System.out.println("sender: " + student.getId());

        StoTMatching stoTMatching = stoTRepository.findBySenderAndReceiver(student,teacher);
        TtoSMatching ttoSMatching = ttoSRepository.findBySenderAndReceiver(teacher,student);

        stoTMatching.setState("체결 완료");
        ttoSMatching.setState("체결 완료");
        teacher.setIngStNum(teacher.getIngStNum() + 1);

        return student.getTel()+","+ teacher.getTel()+"체결 완료!";

    }*/

    //학생 -> 선생님 신청서 전체 조회
    @GetMapping("/getAllSending")
    @ApiOperation(value = "getAllSending", tags = "학생 -> 선생님 신청서 전체 조회")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public List<StoTMatching> getAllSending (HttpServletRequest request){

        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        return studentPostboxService.getAllSending(tel);
    }
   //선생님 -> 학생 신청서 전체 조회
    @GetMapping("/getAllReceiving")
    @ApiOperation(value = "getAllReceiving", tags = "선생님 -> 학생 신청서 전체 조회")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public  List<TtoSMatching> getAllReceiving (HttpServletRequest request){
        String tel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        return studentPostboxService.getAllReceiving(tel);
    }

    @PutMapping("/rating")
    @ApiOperation(value = "updateRating", tags = "학생->선생님 점수 매기기, 과외종료")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "학생 token", required = true, dataType = "string", paramType = "header")
            }
    )
    public ResponseEntity<? extends BasicResponse> updateRating(@RequestParam(value="teacher_tel") String teacher_tel, @RequestParam(value="grade") Integer grade, HttpServletRequest request)
    {
        Teacher teacher = teacherService.findTeacher(teacher_tel);
        System.out.println("receiver: " + teacher.getId());

        Student student = studentService.findStudent(jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request)));
        System.out.println("sender: " + student.getId());
        String result = studentPostboxService.updateRating(student,teacher);
        if(result.equals("종료 완료"))
        {
            if(teacherService.updateRating(teacher,grade).equals("완료"))
                return ResponseEntity.ok().body(new CommonResponse<String>(student.getTel()+","+ teacher.getTel()+"과외가 종료되었습니다."));
            else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("체결되지 않은 과외 정보"));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("과외 종료 실패"));
        }

    }



}
