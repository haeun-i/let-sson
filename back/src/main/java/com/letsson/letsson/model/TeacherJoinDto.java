package com.letsson.letsson.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherJoinDto {


    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    private String name;

    @Pattern(regexp="^\\d{3}-\\d{3,4}-\\d{4}$", message = "000-0000-0000")
    @NotBlank(message = "핸드폰 번호는 필수 입력 값입니다.")
    private String tel;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,20}",
            message = "비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.")
    private String password;

    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    private String region;

    @NotNull(message = "성별은 필수 입력 값입니다.")
    private boolean male;
    @NotNull(message = "성별은 필수 입력 값입니다.")
    private boolean female;

    @NotNull(message = "금액은 필수 입력 값입니다.")
    private Integer pay;

    @NotNull(message = "화상강의여부는 필수 입력 값입니다.")
    private boolean contact;

    @NotNull(message = "화상강의여부는 필수 입력 값입니다.")
    private boolean nonContact;

    private String university;

    private String major;

    private String is_attend;


    private String subject;

    private String intro;

    private String role;

    private int ingStNum;
    private int edStNum;

    private String career;
    private String plan;










}
