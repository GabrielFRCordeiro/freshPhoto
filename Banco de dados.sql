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
 
CREATE TABLE seguindo (
id INT AUTO_INCREMENT PRIMARY KEY,
seguido_id INT, 
seguidos_id INT,
FOREIGN KEY (seguido_id) REFERENCES usuario(id),
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
        p.id DESC;
END //
 
DELIMITER ;

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
                seguidos_id = usuario_id
        )
    ORDER BY 
        p.id DESC;
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
        p.id DESC;
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
    SET senha = p_nova_senha
    WHERE id = p_id_usuario;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER tgr_delete_user BEFORE DELETE
ON usuario
FOR EACH ROW
BEGIN
	DELETE FROM postagem WHERE id_usuario=OLD.id;
    DELETE FROM seguindo WHERE seguido_id=OLD.id;
    DELETE FROM seguindo WHERE seguidos_id=OLD.id;
END//

DELIMITER ;
