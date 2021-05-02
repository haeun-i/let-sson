package com.letsson.letsson.controller;

import com.letsson.letsson.model.*;
import com.letsson.letsson.repository.StoTRepository;
import com.letsson.letsson.repository.StudentRepository;
import com.letsson.letsson.repository.TeacherRepository;
import com.letsson.letsson.repository.TtoSRepository;
import com.letsson.letsson.security.JwtTokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
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


   private final StudentRepository studentRepository;
   private final TeacherRepository teacherRepository;
   private final JwtTokenProvider jwtTokenProvider;

   private final StoTRepository stoTRepository;
   private final TtoSRepository ttoSRepository;

   //학생 to 선생님 신청서 보내기
    @PostMapping("/sendProfile")
    @ApiOperation(value = "sendProfile", tags = "학생->선생님 신청")
    @ApiImplicitParams(
            {
                    //@ApiImplicitParam(name = "receiverTel", value = "신청 대상 선생님 전화번호", dataType = "String", required = true, paramType = "query"),
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public String sendProfile(HttpServletRequest request, @RequestParam(value="teacher_tel") String receiverTel){

       String senderTel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        Student senderStudent = studentRepository.findByTel(senderTel);
        Teacher receiverTeacher = teacherRepository.findByTel(receiverTel);

        if(checkDouble(senderStudent,receiverTeacher)){
            StoTMatching stuSendProfile = StoTMatching.builder()
                    .sender(senderStudent)
                    .receiver(receiverTeacher)
                    .state("신청서 제출")
                    .create_date(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                    .build();
            stoTRepository.save(stuSendProfile);
            String message = "신청자: " + senderTel + " 신청대상: " + receiverTel;
            return message;
        }
        else  return "이미 신청서를 보냈습니다.";
    }

    public boolean checkDouble(Student sender, Teacher receiver){
        boolean result = (stoTRepository.findBySenderAndReceiver(sender,receiver) == null) ;
        return result;
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
    public Long deleteSending(@RequestParam(value="teacher_tel") String teacher_tel,HttpServletRequest request)
    {

        Teacher teacher = teacherRepository.findByTel(teacher_tel);
        System.out.println("receiver: " + teacher.getId());

        Student student = studentRepository.findByTel(jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request)));
        System.out.println("sender: " + student.getId());

        StoTMatching stoTMatching = stoTRepository.findBySenderAndReceiver(student,teacher);

        System.out.println(stoTMatching.getId());
        this.stoTRepository.delete(stoTMatching);
        return stoTMatching.getId();

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

        Student sender = studentRepository.findByTel(tel);

        List<StoTMatching> matchings = stoTRepository.findBySender(sender);

        return matchings;

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
        Student receiver = studentRepository.findByTel(tel);
        List<TtoSMatching> matchings = ttoSRepository.findByReceiver(receiver);

        return matchings;

    }

    @PutMapping("/rating")
    @ApiOperation(value = "updateRating", tags = "학생->선생님 점수 매기기, 과외종료")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "학생 token", required = true, dataType = "string", paramType = "header")
            }
    )
    public String updateRating(@RequestParam(value="teacher_tel") String teacher_tel,@RequestParam(value="grade") Integer grade,HttpServletRequest request)
    {
        Teacher teacher = teacherRepository.findByTel(teacher_tel);
        System.out.println("receiver: " + teacher.getId());

        Student student = studentRepository.findByTel(jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request)));
        System.out.println("sender: " + student.getId());

        double totalGrade = (teacher.getEdStNum()* teacher.getRate() + grade);
        StoTMatching stoTMatching = stoTRepository.findBySenderAndReceiver(student,teacher);
        TtoSMatching ttoSMatching = ttoSRepository.findBySenderAndReceiver(teacher,student);

        if(stoTMatching != null && ttoSMatching != null)
        {
            stoTMatching.setState("종료");
            stoTMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            ttoSMatching.setState("종료");
            ttoSMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.stoTRepository.save(stoTMatching);
            this.ttoSRepository.save(ttoSMatching);
        }
        else if(stoTMatching == null && ttoSMatching != null)
        {
            ttoSMatching.setState("종료");
            ttoSMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.ttoSRepository.save(ttoSMatching);
        }
        else if(ttoSMatching == null && stoTMatching != null)
        {
            stoTMatching.setState("종료");
            stoTMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.stoTRepository.save(stoTMatching);
        }
        /*if(stoTMatching.getState() != "체결 완료" || ttoSMatching.getState() != "체결 완료")
        {
            return "존재하지 않는 과외 정보 입니다.";
        }*/
        teacher.setIngStNum(teacher.getIngStNum() - 1);
        teacher.setEdStNum(teacher.getEdStNum() + 1);
        teacher.setRate(totalGrade/teacher.getEdStNum());
        this.teacherRepository.save(teacher);
        return student.getTel()+","+ teacher.getTel()+"과외가 종료되었습니다.";
    }



}
