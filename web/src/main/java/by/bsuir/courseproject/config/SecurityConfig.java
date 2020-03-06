package by.bsuir.courseproject.config;


import by.bsuir.courseproject.controller.SuccessAuthHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.MessageDigestPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public void registerGlobalAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService)
                .passwordEncoder(getMd5PasswordEncoder());
    }

    @Bean
    public AuthenticationSuccessHandler successAuthHandler() {
        return new SuccessAuthHandler();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.formLogin()
                .loginPage("/")
                .loginProcessingUrl("/j_spring_security_check")
                .successHandler(successAuthHandler())
                .failureUrl("/home?error")
                .usernameParameter("j_username")
                .passwordParameter("j_password")
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/home")
                .invalidateHttpSession(true);
        http.authorizeRequests()
                .antMatchers( "/error").permitAll()
                .antMatchers("/courses").hasAnyRole("ADMINISTRATOR", "TRAINER", "STUDENT")
                .antMatchers("/trainers").hasAnyRole("ADMINISTRATOR", "TRAINER")
                .antMatchers("/registration").hasRole("STUDENT")
                .antMatchers("/unregister").hasRole("STUDENT")
                .antMatchers("/addCourse", "/addTrainer", "/addTask").hasRole("ADMINISTRATOR")
                .antMatchers("/course/**", "/trainer/*", "/task/*").hasRole("ADMINISTRATOR")
                .antMatchers("/editCourse", "/editTrainer").hasRole("ADMINISTRATOR")
                .antMatchers("/editCourse/**", "/editTrainer/*").hasRole("ADMINISTRATOR")
                .antMatchers("/registration").hasRole("STUDENT")
                .antMatchers("/verify").hasRole("TRAINER")
                .antMatchers("/history").hasRole("TRAINER");

    }


    private PasswordEncoder getMd5PasswordEncoder() {
        return new MessageDigestPasswordEncoder("MD5");
    }
}