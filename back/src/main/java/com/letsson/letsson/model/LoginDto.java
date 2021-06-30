package com.letsson.letsson.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {

    @Pattern(regexp="^\\d{3}-\\d{3,4}-\\d{4}$", message = "000-0000-0000")
    @NotBlank(message = "핸드폰 번호는 필수 입력 값입니다.")
    private String tel;

    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,20}"
            ,message = "비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.")
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    private String password;
}
