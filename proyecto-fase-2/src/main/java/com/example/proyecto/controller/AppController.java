package com.example.proyecto.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AppController {

    @GetMapping("/")
    public String home() {
        return "jugar";
    }
    @GetMapping("/login") public String login(){ return "login"; }

    @GetMapping("/jugar")
    public String jugar(Model model, Authentication auth) {
        return "jugar";
    }

}
