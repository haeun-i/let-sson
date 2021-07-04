package com.letsson.letsson.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="teacher")
public class Teacher implements UserDetails
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;
    @Column(name = "tel")
    private String tel;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "region")
    private String region;
    @Column(name = "male")
    private boolean male;
    @Column(name = "female")
    private boolean female;
    @Column(name = "pay")
    private Integer pay;
    @Column(name = "contact")
    private boolean contact ;
    @Column(name = "noncontact")
    private boolean nonContact;
    //null
    @Column(name = "photo")
    private String photo;
    @Column(name = "university")
    private String university;

    @Column(name="major")
    private String major;
    @Column(name = "is_attend")
    private String is_attend;
    @Column(name = "prove_image")
    private String prove_image;
    @Column(name = "subject")
    private String subject;
    @Column(name = "intro")
    private String intro;
    @Column(name = "plan")
    private String plan;
    @Column(name = "career")
    private String career;
    @Column(name = "rate")
    private double rate = 0.0;
    @Column(name = "ingstnum")
    private int ingStNum = 0;
    @Column(name = "edstnum")
    private int edStNum = 0;

    @Column(name="role")
    private String role;

    @OneToMany(mappedBy="receiver",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<StoTMatching> stoTMatchings;


    @OneToMany(mappedBy="sender",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<TtoSMatching> ttoSMatchings;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        String str = getRole();        // Role이 ADMIN일 경우 ROLE_ADMIN 권한 부여
        if (str != "" && str != null) {
            if (str.equals("STUDENT")) {
                authorities.add(new SimpleGrantedAuthority("ROLE_STUDENT"));
            }
             else if(str.equals("TEACHER")) {
                authorities.add(new SimpleGrantedAuthority("ROLE_TEACHER"));
            }
        }
        return authorities;
    }

    @Override
    public String getUsername() {
        return tel;
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
    public Teacher(String username, String password, boolean enabled, boolean accountNonExpired,
                       boolean credentialsNonExpired, boolean accountNonLocked,
                       Collection<? extends GrantedAuthority> authorities) {

    }



}

