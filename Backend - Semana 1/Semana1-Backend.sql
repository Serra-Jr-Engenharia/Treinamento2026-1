CREATE DATABASE BackendSem1;
USE Biblioteca;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    tel VARCHAR(20),
    signUp_date DATE NOT NULL DEFAULT (CURDATE())
);

CREATE TABLE livro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(150) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    copies INT NOT NULL DEFAULT 1,
    available INT NOT NULL DEFAULT 1
);

CREATE TABLE emprestimo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    picked_date DATE NOT NULL DEFAULT (CURDATE()),
    expected_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'ativo',
    CHECK (status IN ('ativo', 'devolvido', 'atrasado')),

    CONSTRAINT fk_emprestimo_usuario
        FOREIGN KEY (user_id) REFERENCES usuario(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,

    CONSTRAINT fk_emprestimo_livro
        FOREIGN KEY (book_id) REFERENCES livro(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);