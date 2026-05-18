CREATE DATABASE livraria;

USE livraria;
CREATE TABLE usuario (
	nome VARCHAR(255),
    id_usuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    data_nasc DATE,
    email VARCHAR(100)
);

CREATE TABLE livro (
	nome_livro VARCHAR(255),
    id_livro INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    autor VARCHAR (255),
    editora VARCHAR (255)
);

CREATE TABLE emprestimo (
	id_emprestimo INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    data_hora_ini DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_fim DATE,
    id_usuario INT NOT NULL, 
	FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE RESTRICT,
    id_livro INT NOT NULL,
    FOREIGN KEY (id_livro) REFERENCES livro(id_livro) ON DELETE RESTRICT
);