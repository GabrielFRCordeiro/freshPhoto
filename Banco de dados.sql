CREATE DATABASE fresh_photo;
USE fresh_photo;
CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
usuario VARCHAR(25) NOT NULL UNIQUE,
senha VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
foto VARCHAR(255)
);

CREATE TABLE postagem(
id INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT NOT NULL,
foto VARCHAR(255) NOT NULL,
categoria ENUM('Bolo', 'Fruta', 'Dia-a-dia', 'Fast food', 'Fruto do mar', 'Legumes', 'Bebidas', 'Caldo', 'Sopa', 'Pizza', 'Massa', 'Hamburger', 'Salgado', 'Graos', 'Vegano', 'Carne', 'Laticinio', 'Legume', 'Sobremesa', 'Gelado') NOT NULL,
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

INSERT INTO usuario(nome,usuario,senha,email,foto) VALUES
('Gabriel Cordeiro','GabrielFRCordeiro','Ti97Ti97','gabriel.frcordeiro@senacsp.edu.br','<caminho_do_repositorio_na_maquina_local>\\backend\\assets\\GabrielFRCordeiro.png'),
('Gustavo Brito','Gustavo-Brito-Bechelli','Ti97Ti97','gustavo.bbechelli@senacsp.edu.br','<caminho_do_repositorio_na_maquina_local>\\backend\\assets\\Gustavo-Brito-Bechelli.jpeg'),
('Jheniffer Santiago','JhenySantiag','Ti97Ti97','jheniffer.ssantos@senacsp.edu.br','<caminho_do_repositorio_na_maquina_local>\\backend\\assets\\JhenySantiag.jpeg'),
('Raviel Sousa','raviel-sousa','Ti97Ti97','raviel.slopes@senacsp.edu.br','<caminho_do_repositorio_na_maquina_local>\\backend\\assets\\raviel-sousa.jpeg');

INSERT INTO seguindo (seguido_id, seguidos_id) VALUES
((SELECT id FROM usuario WHERE usuario = 'GabrielFRCordeiro'), (SELECT id FROM usuario WHERE usuario = 'Gustavo-Brito-Bechelli')),
((SELECT id FROM usuario WHERE usuario = 'GabrielFRCordeiro'), (SELECT id FROM usuario WHERE usuario = 'JhenySantiag')),
((SELECT id FROM usuario WHERE usuario = 'GabrielFRCordeiro'), (SELECT id FROM usuario WHERE usuario = 'raviel-sousa'));

INSERT INTO seguindo (seguido_id, seguidos_id) VALUES
((SELECT id FROM usuario WHERE usuario = 'Gustavo-Brito-Bechelli'), (SELECT id FROM usuario WHERE usuario = 'GabrielFRCordeiro')),
((SELECT id FROM usuario WHERE usuario = 'Gustavo-Brito-Bechelli'), (SELECT id FROM usuario WHERE usuario = 'JhenySantiag')),
((SELECT id FROM usuario WHERE usuario = 'Gustavo-Brito-Bechelli'), (SELECT id FROM usuario WHERE usuario = 'raviel-sousa'));

INSERT INTO seguindo (seguido_id, seguidos_id) VALUES
((SELECT id FROM usuario WHERE usuario = 'JhenySantiag'), (SELECT id FROM usuario WHERE usuario = 'GabrielFRCordeiro')),
((SELECT id FROM usuario WHERE usuario = 'JhenySantiag'), (SELECT id FROM usuario WHERE usuario = 'Gustavo-Brito-Bechelli')),
((SELECT id FROM usuario WHERE usuario = 'JhenySantiag'), (SELECT id FROM usuario WHERE usuario = 'raviel-sousa'));

INSERT INTO seguindo (seguido_id, seguidos_id) VALUES
((SELECT id FROM usuario WHERE usuario = 'raviel-sousa'), (SELECT id FROM usuario WHERE usuario = 'GabrielFRCordeiro')),
((SELECT id FROM usuario WHERE usuario = 'raviel-sousa'), (SELECT id FROM usuario WHERE usuario = 'Gustavo-Brito-Bechelli')),
((SELECT id FROM usuario WHERE usuario = 'raviel-sousa'), (SELECT id FROM usuario WHERE usuario = 'JhenySantiag'));

INSERT INTO postagem(id_usuario,foto,categoria,receita) VALUES
((SELECT id FROM usuario WHERE usuario = 'GabrielFRCordeiro'),'<caminho_do_repositorio_na_maquina_local>\\backend\\assets\\bolo-melancia.jpg','Bolo', 'Ingredientes:
2 xícaras de melancia triturada
2 xícaras de farinha de trigo
1 xícara de açúcar
1/2 xícara de óleo
3 ovos
1 colher (sopa) de fermento

Modo de preparo:
Bata a melancia, ovos e óleo no liquidificador. Misture a farinha e o açúcar em uma tigela. Junte os líquidos aos secos e adicione o fermento. Misture bem e asse por 40 minutos a 180°C. Sirva decorado a gosto! 🍉🍰'),
((SELECT id FROM usuario WHERE usuario = 'Gustavo-Brito-Bechelli'),'<caminho_do_repositorio_na_maquina_local>\\backend\\assets\\picole-melancia.jpg','Gelado', 'Ingredientes:

4 xícaras de melancia picada (sem sementes)
2 colheres de sopa de açúcar (opcional)
Suco de 1 limão
Modo de Preparo:

No liquidificador, bata a melancia até obter um purê.
Adicione o açúcar e o suco de limão, e misture bem.
Despeje a mistura em forminhas de picolé.
Insira palitos e leve ao congelador por pelo menos 4 horas.
Para desenformar, passe as forminhas rapidamente em água morna.
Aproveite seu picolé refrescante! 🍉🍧'),
((SELECT id FROM usuario WHERE usuario = 'JhenySantiag'),'<caminho_do_repositorio_na_maquina_local>\\backend\\assets\\mousse-melancia.jpg', 'Sobremesa', 'Ingredientes:
2 xícaras de melancia picada (sem sementes)
1/2 xícara de creme de leite
1/4 xícara de açúcar
1/2 pacote de gelatina incolor (dissolvida em 1/4 de xícara de água)
Suco de 1 limão
Modo de Preparo:
No liquidificador, bata a melancia até obter um purê.
Adicione o creme de leite, o açúcar, a gelatina dissolvida e o suco de limão. Bata até ficar homogêneo.
Transfira para uma tigela e leve à geladeira por cerca de 2 horas ou até firmar.
Sirva gelado e aproveite! 🍉🍨'),
((SELECT id FROM usuario WHERE usuario = 'raviel-sousa'),'<caminho_do_repositorio_na_maquina_local>\\backend\\assets\\sorvete-melancia.jpg', 'Gelado', 'Ingredientes:
3 xícaras de melancia picada (sem sementes)
1/2 xícara de leite condensado
1/2 xícara de creme de leite fresco

Modo de preparo:
Bata a melancia no liquidificador até ficar líquida.
Adicione o leite condensado e o creme de leite, e bata até misturar.
Despeje em um recipiente e leve ao freezer por 4 horas, mexendo a cada hora para ficar cremoso.

Dica: Sirva com pedacinhos de melancia ou raspas de limão! 🍉🍦');

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
        u.id AS usuario_id,
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
        u.id AS usuario_id,
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
        u.id AS usuario_id,
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