package com.example.proyecto.controller;

import com.example.proyecto.model.Usuario;
import com.example.proyecto.repository.UsuarioRepository;
import com.example.proyecto.service.BitacoraService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin/usuarios")
public class UsuarioAdminController {

    private final UsuarioRepository usuarioRepo;
    private final BitacoraService bitacoraService;

    public UsuarioAdminController(UsuarioRepository usuarioRepo, BitacoraService bitacoraService) {
        this.usuarioRepo = usuarioRepo;
        this.bitacoraService = bitacoraService;
    }

    @GetMapping
    public String listarUsuarios(Model model) {
        model.addAttribute("usuarios", usuarioRepo.findAll());
        model.addAttribute("nuevo", new Usuario());
        return "admin/usuarios"; 
    }
    
    @PostMapping("/crear")
    public String crearUsuario(@ModelAttribute("nuevo") Usuario usuario) {
        usuarioRepo.save(usuario);
        bitacoraService.registrarAccion(usuario.getNombre(), "Creó el usuario: " + usuario.getUsername());
        return "redirect:/admin/usuarios";
    }

    @PostMapping("/{id}/eliminar")
    public String eliminarUsuario(@PathVariable("id") Long id, RedirectAttributes redirectAttrs) {
        try {
            Usuario usuario = usuarioRepo.findById(id).orElse(null);
            if (usuario != null && !"admin".equalsIgnoreCase(usuario.getUsername())) {
                usuarioRepo.deleteById(id);
                bitacoraService.registrarAccion(usuario.getNombre(), "Eliminó el usuario con ID: " + id);
                redirectAttrs.addFlashAttribute("mensaje", "Usuario eliminado correctamente.");
            } else {
                redirectAttrs.addFlashAttribute("mensaje", "No se puede eliminar el usuario principal 'admin'.");
            }
        } catch (Exception e) {
            redirectAttrs.addFlashAttribute("mensaje", "Error al eliminar usuario: " + e.getMessage());
        }
        return "redirect:/admin/usuarios";
    }

}
