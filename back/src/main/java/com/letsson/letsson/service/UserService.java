package com.letsson.letsson.service;

import com.letsson.letsson.model.Student;
import com.letsson.letsson.model.Teacher;
import com.letsson.letsson.repository.StudentRepository;
import com.letsson.letsson.repository.TeacherRepository;
import com.letsson.letsson.response.BasicResponse;
import com.letsson.letsson.response.CommonResponse;
import com.letsson.letsson.response.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final TeacherRepository teacherRepository;

    // 모든 선생님 리스트
    public List<Teacher> getAllTeachers()
    {
       return teacherRepository.findAll();
    }
    // 전체 학생 목록
    public List<Student> getALLStudents()
    {
        return this.studentRepository.findAll();
    }

    // 사용자 아이디 찾기
    public ResponseEntity<? extends BasicResponse> findId(String email, String name)
    {
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

    //사용자 비밀번호 찾기
    public boolean findPassword(String name,String tel){

        if(studentRepository.findByTelAndName(tel,name) != null){
            return true;
        }
        else if(teacherRepository.findByTelAndName(tel,name) != null){
            return true;
        }
        else return false;

    }

    // 사용자 비밀번호 수정
    public ResponseEntity<? extends BasicResponse> resetStudentPassword(String tel, String password)
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
