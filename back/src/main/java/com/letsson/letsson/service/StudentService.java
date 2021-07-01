package com.letsson.letsson.service;

import com.letsson.letsson.model.Student;
import com.letsson.letsson.model.StudentJoinDto;
import com.letsson.letsson.repository.StudentRepository;
import com.letsson.letsson.response.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final AmazonS3ClientService amazonS3ClientService;
    private final CustomUserDetailsService customUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    public String signUp(StudentJoinDto studentJoinDto) {
      if(customUserDetailsService.confirmTel(studentJoinDto.getTel())){
          return "사용불가한 아이디";
      }
       else {
            Student student = Student.builder()
                    .name(studentJoinDto.getName())
                    .is_stu(studentJoinDto.getIs_stu())
                    .age(studentJoinDto.getAge())
                    .male(studentJoinDto.isMale())
                    .female(studentJoinDto.isFemale())
                    .proper_gender(studentJoinDto.getProper_gender())
                    .region(studentJoinDto.getRegion())
                    .subject(studentJoinDto.getSubject())
                    .pay(studentJoinDto.getPay())
                    .contact(studentJoinDto.isContact())
                    .nonContact(studentJoinDto.isNonContact())
                    .tel(studentJoinDto.getTel())
                    .email(studentJoinDto.getEmail())
                    .password(passwordEncoder.encode(studentJoinDto.getPassword()))
                    .role("STUDENT")
                    .build();
            studentRepository.save(student);
            return student.getTel();
        }

    }

    // 전화번호(아이디) 통해 학생 찾기
    public Student findStudent(String tel)
    {
        return studentRepository.findByTel(tel);
    }


    //학생의 기본 정보 수정
    public Student updateBasicStudent(Student existingStudent, StudentJoinDto student)
    {
        existingStudent.setName(student.getName());
        existingStudent.setIs_stu(student.getIs_stu());
        existingStudent.setAge(student.getAge());
        existingStudent.setMale(student.isMale());
        existingStudent.setFemale(student.isFemale());
        existingStudent.setProper_gender(student.getProper_gender());
        existingStudent.setRegion(student.getRegion());
        existingStudent.setSubject(student.getSubject());
        existingStudent.setPay(student.getPay());
        existingStudent.setContact(student.isContact());
        existingStudent.setNonContact(student.isNonContact());
        existingStudent.setTel(student.getTel());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPassword(passwordEncoder.encode(student.getPassword()));

        return studentRepository.save(existingStudent);
    }

    public Student updateStudent(Student existingStudent, StudentJoinDto student)
    {
        existingStudent.setName(student.getName());
        existingStudent.setSubject(student.getSubject());
        existingStudent.setRegion(student.getRegion());
        existingStudent.setIntro(student.getIntro());
        existingStudent.setGoal(student.getGoal());
        existingStudent.setReview(student.getReview());

        return studentRepository.save(existingStudent);
    }

    @Transactional
    public void addProfileImgWithS3(MultipartFile multipartFile, String basePath,String tel) throws IOException
    {
        Student student = studentRepository.findByTel(tel);

       /* //이전 사진 파일 삭제
        String beforeFileName = student.getPhoto();
        if(!beforeFileName.equals("default.png"))
        {
            String beforeFilePath = basePath + "/" + beforeFileName;
            amazonS3ClientService.delete(beforeFilePath);
        }
*/
        String sourceFileName = multipartFile.getOriginalFilename();

        //현재 날짜, 시간을 기준으로 구별값 첨부 -> 중복 방지
        int dataTimeInteger = (int)(new Date().getTime()/1000);
        String fileName = dataTimeInteger+sourceFileName;

        //현재 사진 파일 s3 저장
        //s3Service.upload(multipartFile, basePath, fileName);

        //student 의 photo 에 fileName기록
        student.setPhoto( amazonS3ClientService.upload(multipartFile, basePath));
    }

    //학생 회원 정보 삭제
    public void deleteStudent(String tel)
    {
        Student student = findStudent(tel);
        this.studentRepository.delete(student);
    }




}
