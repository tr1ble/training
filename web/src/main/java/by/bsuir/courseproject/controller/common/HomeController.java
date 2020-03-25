package by.bsuir.courseproject.controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class HomeController {

    private static final String START_PAGE = "index";
    private static final String MAIN_PAGE = "main-page";


    @RequestMapping(value = {"/home"})
    public ModelAndView home() {
        return new ModelAndView(START_PAGE);
    }

    @RequestMapping(value = {"/home?error"})
    public ModelAndView homeError(Model model) {
        model.addAttribute("errorMessage", true);
        return new ModelAndView(START_PAGE);
    }


    @RequestMapping(value = {"main"} )
    public String main() {
        return MAIN_PAGE;
    }




}
