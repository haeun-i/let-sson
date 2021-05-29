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

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final AmazonS3ClientService amazonS3ClientService;
    private final CustomUserDetailsService customUserDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final TeacherRepository teacherRepository;

    public String signUp(TeacherJoinDto teacherJoinDto) throws IOException {
        if(customUserDetailsService.idChk(teacherJoinDto.getTel())){
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



}
