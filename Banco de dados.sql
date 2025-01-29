CREATE DATABASE fresh_photo;
USE fresh_photo;
CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
usuario VARCHAR(20) NOT NULL UNIQUE,
senha VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
foto VARCHAR(255)
);

CREATE TABLE postagem(
id INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT NOT NULL,
foto VARCHAR(255) NOT NULL,
categoria ENUM('Bolo', 'Fruta', 'Dia-a-dia', 'Fast food', 'Fruto do mar', 'Legumes', 'Bebidas', 'Caldo', 'Sopa', 'Pizza') NOT NULL,
receita VARCHAR(500),
data_postagem DATE DEFAULT NOW(),
FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);
CREATE TABLE imagens( 
id INT AUTO_INCREMENT PRIMARY KEY, 
 usuario_id INT,
 caminho_imagem VARCHAR(255),
 FOREIGN KEY (usuario_id) REFERENCES usuario(id) 
 );
 
 CREATE TABLE seguindo ( id INT AUTO_INCREMENT PRIMARY KEY,
 seguido_id INT, 
 seguidos_id INT, FOREIGN KEY (seguido_id) REFERENCES usuario(id),
 FOREIGN KEY (seguidos_id) REFERENCES usuario(id)
 );

/*Criando procedures*/
delimiter //

CREATE PROCEDURE login()
BEGIN
	SELECT id, usuario, email, senha FROM usuario;
END //

delimiter ;

delimiter //

CREATE PROCEDURE cadastrar()
BEGIN
	SELECT id, usuario, email FROM usuario;
END //

delimiter ;

DELIMITER //

CREATE PROCEDURE perfil(
    IN p_usuario_id INT
)
BEGIN
    SELECT 
        u.nome,
        u.usuario,
        u.foto
    FROM 
        usuario u
    WHERE 
        u.id = p_usuario_id;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE retornarTodosPosts()
BEGIN
    SELECT 
        p.id AS postagem_id,
        u.foto AS usuario_foto,
        u.usuario,
        p.foto AS postagem_foto,
        p.categoria
    FROM 
        postagem p
    INNER JOIN 
        usuario u ON p.id_usuario = u.id
    ORDER BY 
        p.data_postagem DESC;
END //
 
DELIMITER ;

DELIMITER //

DELIMITER //

CREATE PROCEDURE obterFotosSeguidos(
    IN usuario_id INT
)
BEGIN
    SELECT 
        p.id AS postagem_id,
        u.foto AS usuario_foto,
        u.usuario,
        p.foto AS postagem_foto,
        p.categoria
    FROM 
        postagem p
    INNER JOIN 
        usuario u ON p.id_usuario = u.id
    WHERE 
        u.id IN (
            SELECT 
                seguido_id 
            FROM 
                seguindo 
            WHERE 
                seguidor_id = usuario_id
        )
    ORDER BY 
        p.data_postagem DESC;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE retornarPostsUsuario(
    IN usuario_id INT
)
BEGIN
    SELECT 
        p.id AS postagem_id,
        u.foto AS usuario_foto,
        u.usuario,
        p.foto AS postagem_foto,
        p.categoria
    FROM 
        postagem p
    INNER JOIN 
        usuario u ON p.id_usuario = u.id
    WHERE 
        p.id_usuario = usuario_id
    ORDER BY 
        p.data_postagem DESC;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE retornaReceitaPost(
    IN p_postagem_id INT
)
BEGIN
    SELECT 
        p.receita AS receita
    FROM 
        postagem p
    WHERE 
        p.id = p_postagem_id;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE AtualizarEmail(
    IN p_id_usuario INT,
    IN p_novo_email VARCHAR(150)
)
BEGIN
    UPDATE usuario
    SET email = p_novo_email
    WHERE id = p_id_usuario;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE AtualizarSenha(
    IN p_id_usuario INT,
    IN p_nova_senha VARCHAR(255)
)
BEGIN

    UPDATE usuario
    SET senha = SHA2(p_nova_senha, 256)
    WHERE id = p_id_usuario;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ApagarContaUsuario(
    IN p_id_usuario INT
)
BEGIN
    
    IF EXISTS (SELECT 1 FROM usuario WHERE id = p_id_usuario) THEN
        DELETE FROM usuario
        WHERE id = p_id_usuario;
        SELECT CONCAT('usuário com id ', p_id_usuario, ' foi excluido.');
    ELSE
        SELECT CONCAT('usuário com id', p_id_usuario, ' não tem.');
    END IF;
END //

DELIMITER ;
