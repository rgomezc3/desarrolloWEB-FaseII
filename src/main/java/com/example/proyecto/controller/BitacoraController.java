package com.example.proyecto.controller;

import com.example.proyecto.service.BitacoraService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BitacoraController {

    private final BitacoraService bitacoraService;

    public BitacoraController(BitacoraService bitacoraService) {
        this.bitacoraService = bitacoraService;
    }

    @GetMapping("/admin/bitacora")
    public String verBitacora(Authentication auth, Model model) {
        model.addAttribute("usuario", auth.getName());
        model.addAttribute("registros", bitacoraService.obtenerHistorial());
        return "admin/bitacora";
    }
}
