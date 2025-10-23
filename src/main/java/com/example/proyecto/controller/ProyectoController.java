package com.example.proyecto.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProyectoController {

    @GetMapping("/proyecto")
    public String mostrarProyecto(Authentication auth, Model model) {
        if (auth != null) {
            model.addAttribute("usuario", auth.getName());
            model.addAttribute("rol", auth.getAuthorities().iterator().next().getAuthority());
            model.addAttribute("isAdmin", auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")));
        } else {
            model.addAttribute("usuario", "Invitado");
            model.addAttribute("rol", "Sin Rol");
            model.addAttribute("isAdmin", false);
        }
        return "proyecto";
    }
}
