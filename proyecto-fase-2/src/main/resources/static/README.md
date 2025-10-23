# Robot Runner – 5x5 con selector de pistas
- 5x5, celdas grandes (72px), robot SVG
- 3 pistas seed; selector (combobox) para alternar entre pistas guardadas
- Movimientos + Bucle (x1)
- Animación 2s/step; mensajes de éxito/fracaso
- Configurar pistas; guardar en localStorage
- Inicio: primer verde de la fila inferior (izquierda); meta inferida si no se define

## Ejecutar
- Abrir `public/index.html` directamente; o
- Servidor estático:
  - Python: `python -m http.server -d public 8080`
  - Node: `npx http-server public -p 8080`
