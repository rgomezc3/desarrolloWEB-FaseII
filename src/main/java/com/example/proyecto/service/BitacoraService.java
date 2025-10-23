package com.example.proyecto.service;

import com.example.proyecto.model.Bitacora;
import com.example.proyecto.repository.BitacoraRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BitacoraService {

    private final BitacoraRepository bitacoraRepository;

    public BitacoraService(BitacoraRepository bitacoraRepository) {
        this.bitacoraRepository = bitacoraRepository;
    }

    public void registrarAccion(String usuario, String accion) {
        Bitacora registro = new Bitacora(usuario, accion);
        registro.setFechaHora(LocalDateTime.now());
        bitacoraRepository.save(registro);
    }

    public List<Bitacora> obtenerHistorial() {
        return bitacoraRepository.findAll();
    }
}
