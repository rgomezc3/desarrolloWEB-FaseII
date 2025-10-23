package com.example.proyecto.service;

import com.example.proyecto.model.Usuario;
import com.example.proyecto.repository.UsuarioRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UsuarioRepository repo;
    public CustomUserDetailsService(UsuarioRepository repo){ this.repo = repo; }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario u = repo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return new User(u.getUsername(), u.getPassword(), List.of(new SimpleGrantedAuthority(u.getRol())));
    }
}
