package com.letsson.letsson.security;

import com.letsson.letsson.repository.StudentRepository;
import com.letsson.letsson.repository.TeacherRepository;
import com.letsson.letsson.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }


    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                //.antMatchers("/teachers").permitAll()
                .antMatchers("/students").hasRole("STUDENT")
                .antMatchers("/students/modify/**").hasRole("STUDENT")
                .antMatchers("students/sendProfile/**").hasRole("STUDENT")
                .antMatchers("students/basicModify/**").hasRole("STUDENT")
                //.antMatchers("/students").permitAll()
                .antMatchers("/students/login","/students/join","/students/idCheck").permitAll()
                .antMatchers("/teachers").hasRole("TEACHER")
                .antMatchers("/teachers/modify/**").hasRole("TEACHER")
                .antMatchers("students/basicModify/**").hasRole("TEACHER")
                .antMatchers("/teachers/login","/teachers/join","teachers/idCheck").permitAll()
                .antMatchers("/users/teachers").authenticated()
                .antMatchers("/users/students").authenticated()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class);
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(new CustomUserDetailsService(studentRepository,teacherRepository)).passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity webSecurity)throws Exception{
        webSecurity.ignoring().antMatchers("/v2/api-docs", "/configuration/ui",

                                "/swagger-resources", "/configuration/security",

                                "/swagger-ui.html", "/webjars/**","/swagger/**");
    }



}
