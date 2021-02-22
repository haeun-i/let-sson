package com.letsson.letsson.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="teacher")
public class TeacherDao implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "phone")
    private String phone;
    @Column(name = "password")
    private String password;
    @Column(name = "mail")
    private String mail;
    @Column(name = "location")
    private String location;
    @Column(name = "age")
    private Integer age;
    @Column(name = "gender")
    private String gender;
    @Column(name = "money")
    private Integer money;
    @Column(name = "contact")
    private String contact;
    @Column(name = "gender_like")
    private String gender_like;
    //null
    @Column(name = "photo")
    private String photo;
    @Column(name = "university")
    private String university;
    @Column(name = "enroll")
    private String enroll;
    //null
    @Column(name = "enroll_photo")
    private String enroll_photo;
    @Column(name = "sub_no")
    private Integer sub_no;
    @Column(name = "intro")
    private String intro;
    @Column(name = "plan")
    private String plan;
    @Column(name = "appeal")
    private String appeal;
    @Column(name = "rate")
    private Float rate;
    @Column(name = "stnum")
    private Integer stnum;


    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return phone;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}

