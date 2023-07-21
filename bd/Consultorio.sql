CREATE DATABASE Consultorio;
USE Consultorio;
-- Tabla de doctores
CREATE TABLE doctores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  especialidad VARCHAR(255) NOT NULL,
  consultorio VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL
);

-- Tabla de pacientes
CREATE TABLE pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  cedula VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  edad INT NOT NULL,
  telefono VARCHAR(255) NOT NULL
);

-- Tabla de citas médicas
CREATE TABLE citas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_paciente INT NOT NULL,
  id_doctor INT NOT NULL,
  especialidad VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_paciente) REFERENCES pacientes(id),
  FOREIGN KEY (id_doctor) REFERENCES doctores(id)
);

-- Tabla de especialidades
CREATE TABLE especialidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL
);

INSERT INTO especialidades (nombre) VALUES
  ('Medicina general'),
  ('Cardiología'),
  ('Medicina interna'),
  ('Dermatología'),
  ('Rehabilitación física'),
  ('Psicología'),
  ('Odontología'),
  ('Radiología');

SHOW VARIABLES LIKE 'character_set_server';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

