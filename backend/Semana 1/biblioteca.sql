create database biblioteca;
use biblioteca;

create table usuarios(
	id int primary key auto_increment,
    nome varchar(100) not null,
	email varchar(255) not null unique
);


create table livros(
	id int primary key auto_increment,
    titulo varchar(200) not null,
	autor varchar(100) not null,
    ano year not null,
    quantidade int not null default 1
);


create table emprestimos(
	id int primary key auto_increment,
    usuario_id int not null,
    livro_id int not null,
    data_emprestimo date not null,
    data_devolucao date,
    data_prev_devolução date not null,
    
    check(
		data_devolucao is null or data_devolucao >= data_emprestimo
        ),
    
	constraint fk_emprestimo_usuario
		foreign key (usuario_id)
		references usuarios(id)
        on delete restrict
        on update cascade,
        
	constraint fk_emprestimo_livro
		foreign key (livro_id)
		references livros(id)
        on delete restrict
        on update cascade
);

insert into usuarios (nome, email)
values('Gustavo Leal', 'gustavo@gmail.com');

insert into livros(titulo, autor, ano, quantidade)
values('The Walking Dead', 'Robert Kirkman', '2003', 10);

select * from livros