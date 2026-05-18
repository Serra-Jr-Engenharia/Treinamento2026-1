CREATE DATABASE IF NOT EXISTS biblioteca;

CREATE TABLE usuario (
	id_usuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cpf INT(11) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE livro (
	id_livro INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    titulo VARCHAR(250),
    autor VARCHAR(150)
);


 CREATE TABLE emprestimo (
	id_emprestimo INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario),
    FOREIGN KEY (livro_id) REFERENCES livro(id_livro)
);