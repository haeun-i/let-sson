package com.letsson.letsson.controller;

import com.letsson.letsson.model.*;
import com.letsson.letsson.repository.StoTRepository;
import com.letsson.letsson.repository.StudentRepository;
import com.letsson.letsson.repository.TeacherRepository;
import com.letsson.letsson.repository.TtoSRepository;
import com.letsson.letsson.response.ErrorResponse;
import com.letsson.letsson.security.JwtTokenProvider;
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
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final StoTRepository stoTRepository;
    private final TtoSRepository ttoSRepository;

    //선생님 to 학생 신청서 보내기
    @PostMapping("/sendProfile")
    @ApiOperation(value = "sendProfile", tags = "선생님 -> 학생 신청")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public String sendProfile(HttpServletRequest request, @RequestParam(value="student_tel") String receiverTel){
        String senderTel = jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request));
        Teacher senderTeacher = teacherRepository.findByTel(senderTel);
        Student receiverStudent = studentRepository.findByTel(receiverTel);
        if(checkDouble(receiverStudent,senderTeacher))
        {
            TtoSMatching profile = TtoSMatching.builder()
                    .sender(senderTeacher)
                    .receiver(receiverStudent)
                    .state("신청서 제출")
                    .create_date(LocalDateTime.now().plusHours(9))
                    .build();
            ttoSRepository.save(profile);
            System.out.println(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));
            String message = "신청자: " + senderTel + " 신청대상: " + receiverTel;
            return message;
        }
        else return "이미 신청서를 보냈습니다.";
    }

    public boolean checkDouble(Student student, Teacher teacher){

        boolean result = (ttoSRepository.findBySenderAndReceiver(teacher,student) == null);

        return result;
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
    public Long deleteSending(@RequestParam(value="student_tel") String student_tel,HttpServletRequest request){
        Student student = studentRepository.findByTel(student_tel);
        System.out.println("receiver: " + student.getId());
        Teacher teacher = teacherRepository.findByTel(jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request)));
        System.out.println("sender: " + teacher.getId());
        TtoSMatching ttoSMatching = ttoSRepository.findBySenderAndReceiver(teacher,student);
        System.out.println(ttoSMatching.getId());
        this.ttoSRepository.delete(ttoSMatching);
        return ttoSMatching.getId();

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
        Teacher sender = teacherRepository.findByTel(tel);

        List<TtoSMatching> matchings = ttoSRepository.findBySender(sender);
        return matchings;
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
        Teacher receiver = teacherRepository.findByTel(tel);
        List<StoTMatching> matchings = stoTRepository.findByReceiver(receiver);

        return matchings;

    }
    @PostMapping("/makeLetsson")
    @ApiOperation(value = "makeLetsson", tags = "학생->선생님 신청 체결(선생님이 승낙)")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "authorization header", required = true, dataType = "string", paramType = "header")
            }
    )
    public String makeLetsson(@RequestParam(value="student_tel") String student_tel,HttpServletRequest request)
    {
        Student student = studentRepository.findByTel(student_tel);
        System.out.println("receiver: " + student.getId());
        Teacher teacher = teacherRepository.findByTel(jwtTokenProvider.getTel(jwtTokenProvider.resolveToken(request)));
        System.out.println("sender: " + teacher.getId());

        StoTMatching stoTMatching = stoTRepository.findBySenderAndReceiver(student,teacher);
        TtoSMatching ttoSMatching = ttoSRepository.findBySenderAndReceiver(teacher,student);

        if(stoTMatching.getState() == "체결 완료" || ttoSMatching.getState() == "체결 완료" )
        {
           return "이미 체결되었습니다.";
        }
        if(stoTMatching != null && ttoSMatching != null)
        {
            stoTMatching.setState("체결 완료");
            stoTMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            ttoSMatching.setState("체결 완료");
            ttoSMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.stoTRepository.save(stoTMatching);
            this.ttoSRepository.save(ttoSMatching);
        }
        else if(stoTMatching == null && ttoSMatching != null)
        {
            ttoSMatching.setState("체결 완료");
            ttoSMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.ttoSRepository.save(ttoSMatching);
        }
        else if(ttoSMatching == null && stoTMatching != null)
        {
            stoTMatching.setState("체결 완료");
            stoTMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.stoTRepository.save(stoTMatching);
        }
        teacher.setIngStNum(teacher.getIngStNum() + 1);
        this.teacherRepository.save(teacher);
        return student.getTel()+","+ teacher.getTel()+"체결 완료!";
    }

}
