CREATE DATABASE fresh_photo;
USE fresh_photo;
CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
usuario VARCHAR(20) NOT NULL UNIQUE,
senha VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
foto VARCHAR(255) imagem_perfil VARCHAR(255) status_usuario ENUM('ativo', 'inativo')
);

CREATE TABLE receita(
id INT PRIMARY KEY AUTO_INCREMENT,
texto VARCHAR(500) UNIQUE
);
CREATE TABLE postagem(
id INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT NOT NULL,
id_categoria INT NOT NULL,
foto VARCHAR(255) NOT NULL,
id_receita INT,
categoria VARCHAR NOT NULL ENUM('Bolo', 'fruta', 'dia-a-dia', 'fast food')
data_postagem DATE DEFAULT(NOW()),
FOREIGN KEY (id_usuario) REFERENCES usuario(id),
FOREIGN KEY (id_categoria) REFERENCES categoria(id),
FOREIGN KEY (id_receita) REFERENCES receita(id)
);
CREATE TABLE comentario(
id INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT NOT NULL,
id_postagem INT NOT NULL,
texto VARCHAR(120) NOT NULL,
data_comentario DATE DEFAULT(NOW()),
FOREIGN KEY (id_usuario) REFERENCES usuario(id),
FOREIGN KEY (id_postagem) REFERENCES postagem(id)
);
CREATE TABLE curtida(
id INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT NOT NULL,
id_postagem INT NOT NULL,
data_curtida DATE DEFAULT(NOW()),
FOREIGN KEY (id_usuario) REFERENCES usuario(id),
FOREIGN KEY (id_postagem) REFERENCES postagem(id)
);
CREATE TABLE imagens( 
id INT AUTO_INCREMENT PRIMARY KEY, 
 usuario_id INT,
 caminho_imagem VARCHAR(255),
 FOREIGN KEY (usuario_id) REFERENCES usuario(id) 
 );
 
 CREATE TABLE seguindo ( id INT AUTO_INCREMENT PRIMARY KEY,
 seguido_id INT, 
 seguido_id INT, FOREIGN KEY (seguido_id) REFERENCES usuario(id),
 FOREIGN KEY (seguido_id) REFERENCES usuario(id)
 );
 
 /* Usuario pesquisa por uma categoria de comida específica */
/* trocar teste por categoria buscada */
SELECT p.*, cat.nome
FROM postagem p
INNER JOIN categoria cat
ON p.id_categoria=cat.id
WHERE cat.nome='teste';
/* Usuario pesquisa por um nome ou arroba de um usuário */
/* trocar teste por palavra buscada */
SELECT * FROM usuario
WHERE usuario.nome LIKE '%teste%' OR usuario.usuario LIKE '%teste%';
/* Usuario clica na foto e expandir */
/* trocar 1 por id da foto clicada */
SELECT * FROM postagem
WHERE id=1;
/* Usuario curte postagem */
/* trocar 1 por id do usuario que curtiu */
/* trocar 2 por id da postagem curtida */
/* RECADO PRO BACK-END: isso só pode acontecer se essa combinação de id_usuario e id_postagem não existir na tabela curtida ainda */
INSERT INTO curtida(id_usuario,id_postagem)
VALUES(1,2);
/* Usuario vê suas curtidas */
/* trocar 1 por id do usuario que quer ver as curtidas */
SELECT * FROM curtida
WHERE id_usuario=1;
/* Usuario remove curtida de postagem */
/* trocar 1 por id da curtida a ser removida */
DELETE FROM curtida
WHERE id=1;
/* Usuario comenta em postagem */
/* trocar 1 por id do usuario que comentou */
/* trocar 2 por id da postagem comentada */
/* trocar teste por texto do comentario */
INSERT INTO comentario(id_usuario,id_postagem,texto)
VALUES(1,2,'teste');
/* Usuario clica para ver comentários de uma postagem */
/* trocar 1 por id da postagem que vai ter seus comentarios exibidos */
SELECT * FROM comentario
WHERE id_postagem = 1;
/* Usuario posta foto sem legenda ou receita */
/* trocar 1 por id do usuario que postou */
/* trocar 2 por id da categoria da postagem */
INSERT INTO postagem(id_usuario,id_categoria,foto)
VALUES(1,2,'caminho');
/* Usuario posta foto com legenda, mas sem receita */
/* trocar 1 por id do usuario que postou */
/* trocar 2 por id da categoria da postagem */
/* trocar teste-legenda pela legenda postada */
INSERT INTO postagem(id_usuario,id_categoria,foto,legenda)
VALUES(1,2,'outro-caminho','teste-legenda');
/* Usuario posta foto com receita, mas sem legenda */
/* trocar teste-receita por receita */
/* trocar 1 por id do usuario que postou */
/* trocar 2 por id da categoria da postagem */
/* trocar 3 por id da receita da postagem */
INSERT INTO receita(texto)
VALUES('teste-receita');
INSERT INTO postagem(id_usuario,id_categoria,foto,id_receita)
VALUES(1,2,'outro-caminho',3);
/* Usuario posta foto com legenda e receita */
/* trocar teste-receita por receita */
/* trocar 1 por id do usuario que postou */
/* trocar 2 por id da categoria da postagem */
/* trocar teste-legenda pela legenda postada */
/* trocar 3 por id da receita da postagem */
INSERT INTO receita(texto)
VALUES('teste-receita');
INSERT INTO postagem(id_usuario,id_categoria,foto,legenda,id_receita)
VALUES(1,2,'outro-caminho','teste-legenda',3);
/* Usuario clica para ver receita de uma postagem */
/* trocar 1 por id_receita da postagem clicada */
SELECT texto FROM receita
WHERE id=1;

/* VIEWs para pesquisa */
CREATE VIEW relatorio_de_usuarios AS SELECT
U.nome, U.usuario, U.email, U.senha FROM usuario U;

CREATE VIEW relatorio_de_receita AS SELECT
R.texto, RU.nome
FROM receita
INNER JOIN usuario U
ON RU.nome = U.nome;

CREATE VIEW relatorio_de_postagem AS SELECT
U.usuario, C.catg, P.legenda, P.data_postagem
FROM postagem P
INNER JOIN categoria C
INNER JOIN usuario U
ON C.catg = C.id
ON U.usuario = U.id;

CREATE VIEW get_cadastro AS SELECT
usuario, email, senha FROM usuario;

CREATE VIEW get_login AS SELECT
usuario, email FROM usuario;

/*Criando procedures*/
delimiter //

CREATE PROCEDURE login()
BEGIN
	SELECT usuario, email, senha FROM usuario;
END //

delimiter ;

delimiter //

CREATE PROCEDURE cadastrar()
BEGIN
	SELECT usuario, email FROM usuario;
END //

delimiter ;

delimiter //

CREATE PROCEDURE perfil()
BEGIN
SELECT nome, usuario, foto FROM usuario;
END //

delimiter ;

DELIMITER $$

CREATE PROCEDURE obterImagensSeguidos(
    IN usuario_id INT
)
BEGIN
    SELECT i.id AS imagem_id, 
           i.caminho_imagem, 
           u.id AS usuario_id, 
           u.nome
    FROM imagens i
    INNER JOIN usuario u ON i.usuario_id = u.id
    INNER JOIN seguindo s ON s.seguido_id = u.id
    WHERE s.seguidor_id = usuario_id
    ORDER BY i.data_upload DESC;
END $$

DELIMITER ;

CALL obterImagensSeguidos(id_usuario); 


DELIMITER $$

CREATE PROCEDURE atualizarImagemPerfil(
    IN p_usuario_id INT,
    IN p_caminho_imagem VARCHAR(255)
)
BEGIN
    -- verifica se o usuário existe
    IF EXISTS (SELECT 1 FROM usuarios WHERE id = p_usuario_id) THEN
        -- o caminho da imagem de perfil
        UPDATE usuario
        SET imagem_perfil = p_caminho_imagem
        WHERE id = p_usuario_id;
    ELSE
        -- Caso o usuário não exista, gera um erro 
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuário não encontrado.';
    END IF;
END $$

DELIMITER ;
CALL atualizarImagemPerfil(1,"");

DELIMITER $$

CREATE PROCEDURE atualizarNomePerfil(
    IN p_usuario_id INT,
    IN p_novo_nome VARCHAR(100)
)
BEGIN
    
    IF EXISTS (SELECT 1 FROM usuario WHERE id = p_usuario_id) THEN
        
        UPDATE usuario
        SET nome = p_novo_nome
        WHERE id = p_usuario_id;
    ELSE
       
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuário não encontrado.';
    END IF;
END $$

DELIMITER ;

DELIMITER //

CREATE PROCEDURE AtualizarUsuario(
    IN p_id_usuario INT,
    IN p_nome VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_status ENUM('ativo', 'inativo')
)
BEGIN
    UPDATE usuario
    SET 
        nome = p_nome,
        email = p_email,
        status_usuario = p_status,
    WHERE id_usuario = p_id_usuario;
END //

DELIMITER ;
CALL AtualizarUsuario(1);
SELECT * FROM usuario WHERE id_usuario = 1;




DELIMITER //

CREATE PROCEDURE AtualizarEmail(
    IN p_id_usuario INT,
    IN p_novo_email VARCHAR(150)
)
BEGIN
    UPDATE usuario
    SET email = p_novo_email,
    WHERE id_usuario = p_id_usuario;
END //

DELIMITER ;
CALL AtualizarEmail(1);
SELECT id_usuario, email, id_usuario = 1;

DELIMITER //

CREATE PROCEDURE AtualizarSenha(
    IN p_id_usuario INT,
    IN p_nova_senha VARCHAR(255)
)
BEGIN

    UPDATE usuario
    SET senha = SHA2(p_nova_senha, 256), 
    WHERE id_usuario = p_id_usuario;
END //

DELIMITER ;
CALL AtualizarSenha(1);
SELECT id_usuario FROM usuarios WHERE id_usuario = 1; --- não revela a senha 




DELIMITER //

CREATE PROCEDURE ApagarContaUsuario(
    IN p_id_usuario INT
)
BEGIN
    
    IF EXISTS (SELECT 1 FROM usuarios WHERE id_usuario = p_id_usuario) THEN
        DELETE FROM usuario
        WHERE id_usuario = p_id_usuario;
        SELECT CONCAT('usuário com id ', p_id_usuario, ' foi excluido.');
    ELSE
        SELECT CONCAT('usuário com id', p_id_usuario, ' não tem.');
    END IF;
END //

DELIMITER ;

CALL ApagarContaUsuario(1);
SELECT * FROM usuario WHERE id_usuario = 1;

