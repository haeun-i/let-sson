package com.letsson.letsson.service;

import com.letsson.letsson.model.Student;
import com.letsson.letsson.model.Teacher;
import com.letsson.letsson.model.TeacherJoinDto;
import com.letsson.letsson.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final AmazonS3ClientService amazonS3ClientService;
    private final CustomUserDetailsService customUserDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final TeacherRepository teacherRepository;

    // 핸드폰 번호(아이디) 통해 선생님 찾기
    public Teacher findTeacher(String tel)
    {
        return this.teacherRepository.findByTel(tel);
    }
    // 선생님 회원 가입
    public String signUp(TeacherJoinDto teacherJoinDto) throws IOException {
        if(customUserDetailsService.confirmTel(teacherJoinDto.getTel())){
            return "사용불가한 아이디";
        }
        else {
            Teacher teacher = Teacher.builder()
                    .name(teacherJoinDto.getName())
                    .subject(teacherJoinDto.getSubject())
                    .female(teacherJoinDto.isFemale())
                    .male(teacherJoinDto.isMale())
                    .pay(teacherJoinDto.getPay())
                    .region(teacherJoinDto.getRegion())
                    .contact(teacherJoinDto.isContact())
                    .nonContact(teacherJoinDto.isNonContact())
                    .is_attend(teacherJoinDto.getIs_attend())
                    .university(teacherJoinDto.getUniversity())
                    .major(teacherJoinDto.getMajor())
                    .intro(teacherJoinDto.getIntro())
                    .email(teacherJoinDto.getEmail())
                    .tel(teacherJoinDto.getTel())
                    .password(passwordEncoder.encode(teacherJoinDto.getPassword()))
                    .role("TEACHER")
                    .build();
            teacherRepository.save(teacher);
            return teacher.getTel();
        }

    }
    // 모든 선생님 리스트
    public List<Teacher> getAllTeachers()
    {
        return this.teacherRepository.findAll();
    }

    // 선생님 기본 정보 업데이트
    public Teacher updateBasicTeacher(Teacher existingTeacher,TeacherJoinDto teacher)
    {
        existingTeacher.setName(teacher.getName());
        existingTeacher.setSubject(teacher.getSubject());
        existingTeacher.setFemale(teacher.isFemale());
        existingTeacher.setMale(teacher.isMale());
        existingTeacher.setPay(teacher.getPay());
        existingTeacher.setRegion(teacher.getRegion());
        existingTeacher.setContact(teacher.isContact());
        existingTeacher.setNonContact(teacher.isNonContact());
        existingTeacher.setIs_attend(teacher.getIs_attend());
        existingTeacher.setMajor(teacher.getMajor());
        existingTeacher.setUniversity(teacher.getUniversity());
        existingTeacher.setIntro(teacher.getIntro());
        existingTeacher.setEmail(teacher.getEmail());
        existingTeacher.setTel(teacher.getTel());
        existingTeacher.setPassword(passwordEncoder.encode(teacher.getPassword()));

        return this.teacherRepository.save(existingTeacher);
    }

    public Teacher updateTeacher(Teacher existingTeacher,TeacherJoinDto teacher)
    {
        existingTeacher.setName(teacher.getName());
        existingTeacher.setUniversity(teacher.getUniversity());
        existingTeacher.setMajor(teacher.getMajor());
        existingTeacher.setSubject(teacher.getSubject());
        existingTeacher.setRegion(teacher.getRegion());
        existingTeacher.setCareer(teacher.getCareer());
        existingTeacher.setIntro(teacher.getIntro());
        existingTeacher.setPlan(teacher.getPlan());

        return this.teacherRepository.save(existingTeacher);
    }
    @Transactional
    public void addProfileImgWithS3(MultipartFile multipartFile, String basePath,String tel) throws IOException
    {
        Teacher teacher = teacherRepository.findByTel(tel);

      /*  //이전 사진 파일 삭제
        String beforeFileName = teacher.getPhoto();
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
        teacher.setPhoto(amazonS3ClientService.upload(multipartFile, basePath));
    }


    // 선생님 삭제
    public void deleteTeacher(String tel)
    {
        Teacher existingTeacher = findTeacher(tel);
        this.teacherRepository.delete(existingTeacher);
    }
    public void makeLetsson(Teacher teacher)
    {
        teacher.setIngStNum(teacher.getIngStNum() + 1);
        this.teacherRepository.save(teacher);

    }

    // 선생님 과외 종료 후 정보 업데이트
    public void updateRating(Teacher teacher,Integer grade)
    {
        double totalGrade = (teacher.getEdStNum()* teacher.getRate() + grade);
        teacher.setIngStNum(teacher.getIngStNum() - 1);
        teacher.setEdStNum(teacher.getEdStNum() + 1);
        teacher.setRate(totalGrade/teacher.getEdStNum());
        this.teacherRepository.save(teacher);
    }

}
