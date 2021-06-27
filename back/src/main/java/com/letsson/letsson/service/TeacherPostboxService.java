package com.letsson.letsson.service;

import com.letsson.letsson.model.StoTMatching;
import com.letsson.letsson.model.Student;
import com.letsson.letsson.model.Teacher;
import com.letsson.letsson.model.TtoSMatching;
import com.letsson.letsson.repository.StoTRepository;
import com.letsson.letsson.repository.StudentRepository;
import com.letsson.letsson.repository.TeacherRepository;
import com.letsson.letsson.repository.TtoSRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherPostboxService {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final StoTRepository stoTRepository;
    private final TtoSRepository ttoSRepository;

    public boolean checkDouble(Student student, Teacher teacher){

        boolean result = (ttoSRepository.findBySenderAndReceiver(teacher,student) == null);

        return result;
    }
    public String sendProfile(Student receiverStudent,Teacher senderTeacher)
    {
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
            String message = "신청자: " + senderTeacher.getTel() + " 신청대상: " + receiverStudent.getTel() ;
            return message;
        }
        else return "이미 신청서를 보냈습니다.";
    }

    public String deleteSending(Teacher teacher,Student student)
    {
        TtoSMatching ttoSMatching = ttoSRepository.findBySenderAndReceiver(teacher,student);
        if(ttoSMatching == null) return "존재하지 않는 신청서 입니다.";
        System.out.println(ttoSMatching.getId());
        this.ttoSRepository.delete(ttoSMatching);
        return ttoSMatching.getSender() +","+ ttoSMatching.getReceiver();
    }

    public List<TtoSMatching> getAllSending(String tel)
    {
        Teacher sender = teacherRepository.findByTel(tel);

        List<TtoSMatching> matchings = ttoSRepository.findBySender(sender);
        return matchings;
    }
    public  List<StoTMatching> getAllReceiving(String tel)
    {
        Teacher receiver = teacherRepository.findByTel(tel);
        List<StoTMatching> matchings = stoTRepository.findByReceiver(receiver);

        return matchings;
    }

    public String makeLetsson(Student student,Teacher teacher)
    {
        StoTMatching stoTMatching = stoTRepository.findBySenderAndReceiver(student,teacher);
        TtoSMatching ttoSMatching = ttoSRepository.findBySenderAndReceiver(teacher,student);
        if(stoTMatching != null && ttoSMatching != null)
        {
            if(stoTMatching.getState() == "체결 완료" || ttoSMatching.getState() == "체결 완료" )
            {
                return "이미 체결되었습니다.";
            }
            stoTMatching.setState("체결 완료");
            stoTMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            ttoSMatching.setState("체결 완료");
            ttoSMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.stoTRepository.save(stoTMatching);
            this.ttoSRepository.save(ttoSMatching);
            return "체결 완료";
        }
        else if(stoTMatching == null && ttoSMatching != null)
        {
            if(ttoSMatching.getState() == "체결 완료" )
            {
                return "이미 체결되었습니다.";
            }
            ttoSMatching.setState("체결 완료");
            ttoSMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.ttoSRepository.save(ttoSMatching);
            return "체결 완료";
        }
        else if(ttoSMatching == null && stoTMatching != null)
        {
            if(stoTMatching.getState() == "체결 완료" )
            {
                return "이미 체결되었습니다.";
            }

            stoTMatching.setState("체결 완료");
            stoTMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.stoTRepository.save(stoTMatching);
            return "체결 완료";
        }
        else return "존재하지 않는 신청서 입니다.";
    }
}
