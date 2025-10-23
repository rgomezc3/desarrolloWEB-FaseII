package com.example.proyecto.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bitacora")
public class Bitacora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;
    private String accion;

    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    public Bitacora() {}

    public Bitacora(String usuario, String accion) {
        this.usuario = usuario;
        this.accion = accion;
        this.fechaHora = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getUsuario() { return usuario; }
    public String getAccion() { return accion; }
    public LocalDateTime getFechaHora() { return fechaHora; }

    public void setId(Long id) { this.id = id; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public void setAccion(String accion) { this.accion = accion; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }
}
