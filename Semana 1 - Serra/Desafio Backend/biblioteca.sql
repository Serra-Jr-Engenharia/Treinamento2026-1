CREATE DATABASE IF NOT EXISTS biblioteca DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;

USE biblioteca;

DROP TABLE IF EXISTS usuario;

CREATE TABLE  usuario(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome varchar(20) NOT NULL,
  telefone varchar(9) NOT NULL,
  email varchar(30) NOT NULL
)ENGINE=INNODB; 

DROP TABLE IF EXISTS emprestimo;

CREATE TABLE emprestimo(
  id INT AUTO_INCREMENT PRIMARY KEY, 
  FkUsuario INT,
  FkLivro INT,
  datEmprestimo DATE,
  FOREIGN KEY (FkUsuario) REFERENCES usuario(id),
  FOREIGN KEY (FkUsuario) REFERENCES livro(id)
);

DROP TABLE IF EXISTS livro;

CREATE TABLE livro(
  id INT AUTO_INCREMENT PRIMARY,
  nome varchar(20),
  autor varchar(20)
);