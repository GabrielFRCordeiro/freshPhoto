USE fresh_photo;
CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
usuario VARCHAR(20) NOT NULL UNIQUE,
senha VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
foto VARCHAR(255), imagem_perfil VARCHAR(255), status_usuario ENUM('ativo', 'inativo')
);

CREATE TABLE receita(
id INT PRIMARY KEY AUTO_INCREMENT,
texto VARCHAR(500) UNIQUE
);
CREATE TABLE postagem(
id INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT NOT NULL,
foto VARCHAR(255) NOT NULL,
categoria ENUM('Bolo', 'fruta', 'dia-a-dia', 'fast food') NOT NULL,
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

CREATE PROCEDURE atualizarNomePerfil(
    IN p_usuario_id INT,
    IN p_novo_nome VARCHAR(100)
)
BEGIN
    
    IF EXISTS (SELECT 1 FROM usuario WHERE id = p_usuario_id) THEN
        
        UPDATE usuario SET nome = p_novo_nome WHERE id = p_usuario_id;
    ELSE
       
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuário não encontrado.';
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
        status_usuario = p_status
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

