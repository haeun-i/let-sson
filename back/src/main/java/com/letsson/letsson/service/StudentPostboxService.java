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
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentPostboxService {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final StoTRepository stoTRepository;
    private final TtoSRepository ttoSRepository;

    public boolean checkDouble(Student sender, Teacher receiver){
        boolean result = (stoTRepository.findBySenderAndReceiver(sender,receiver) == null) ;
        return result;
    }
    public String sendProfile(Student senderStudent, Teacher receiverTeacher)
    {
        if(checkDouble(senderStudent,receiverTeacher)){
            StoTMatching stuSendProfile = StoTMatching.builder()
                    .sender(senderStudent)
                    .receiver(receiverTeacher)
                    .state("신청서 제출")
                    .create_date(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                    .build();
            stoTRepository.save(stuSendProfile);
            String message = "신청자: " + senderStudent.getTel() + " 신청대상: " + receiverTeacher.getTel();
            return message;
        }
        else  return "이미 신청서를 보냈습니다.";
    }

    public StoTMatching findMatching(Student sender, Teacher receiver)
    {
        return stoTRepository.findBySenderAndReceiver(sender,receiver);
    }
    public String deleteSending(Student student,Teacher teacher)
    {
        StoTMatching stoTMatching = stoTRepository.findBySenderAndReceiver(student,teacher);
        if(stoTMatching == null) return "존재하지 않는 신청서 입니다.";
        System.out.println(stoTMatching.getId());
        this.stoTRepository.delete(stoTMatching);
        return  stoTMatching.getSender() +","+ stoTMatching.getReceiver();
    }

    public List<StoTMatching> getAllSending(String tel)
    {
        Student sender = studentRepository.findByTel(tel);

        List<StoTMatching> matchings = stoTRepository.findBySender(sender);
        return matchings;
    }
    public List<TtoSMatching> getAllReceiving(String tel)
    {
        Student receiver = studentRepository.findByTel(tel);
        List<TtoSMatching> matchings = ttoSRepository.findByReceiver(receiver);

        return matchings;
    }

    public String updateRating(Student student, Teacher teacher)
    {
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
            return "종료 완료";
        }
        else if(null == stoTMatching && ttoSMatching != null)
        {
            ttoSMatching.setState("종료");
            ttoSMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.ttoSRepository.save(ttoSMatching);
            return "종료 완료";
        }
        else if(ttoSMatching == null && stoTMatching != null)
        {
            stoTMatching.setState("종료");
            stoTMatching.setCreate_date(LocalDateTime.now().plusHours(9));
            this.stoTRepository.save(stoTMatching);
            return "종료 완료";
        }
        return "종료 실패";

    }
}
