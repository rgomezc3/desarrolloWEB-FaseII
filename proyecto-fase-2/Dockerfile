# ============================================================
# Etapa 1: Compilar el proyecto con Maven
# ============================================================
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos pom.xml y descargamos dependencias (para aprovechar la caché)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiamos el código fuente del proyecto
COPY src ./src

# Compilamos el proyecto (sin ejecutar los tests)
RUN mvn clean package -DskipTests

# ============================================================
# Etapa 2: Imagen final con H2 embebido
# ============================================================
FROM eclipse-temurin:21-jdk

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos específicamente el JAR ejecutable
# Usamos un nombre fijo (el que realmente existe en tu target)
COPY --from=builder /app/target/proyecto-fase-2-0.0.1-SNAPSHOT.jar /app/app.jar

# Exponemos el puerto 8080
EXPOSE 8080

# Variables de entorno para H2 (opcional, pero útil)
ENV SPRING_PROFILES_ACTIVE=h2
ENV SPRING_DATASOURCE_URL=jdbc:h2:mem:db_desarrollo_web
ENV SPRING_DATASOURCE_DRIVERCLASSNAME=org.h2.Driver
ENV SPRING_DATASOURCE_USERNAME=sa
ENV SPRING_DATASOURCE_PASSWORD=
ENV SPRING_H2_CONSOLE_ENABLED=true

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
