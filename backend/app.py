from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

# Pegando usuario do banco de dados
@app.route('/usuario', methods=['GET'])
def pegar_usuario():
    conn = get_connection()
    cursor = conn.cursor(dictionary = True)
    cursor.execute("SELECT * FROM usuario")
    usuario = cursor.fetchall()
    return jsonify(usuario), 200

@app.route("/usuario/login", methods=["GET"])
def get_usuario_login():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL login()")
        usuario = cursor.fetchall() 
        return jsonify(usuario), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

@app.route("/usuario/cadastrar", methods=["GET"])
def get_usuario_cadastrar():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL cadastrar()")
        usuario = cursor.fetchall() 
        return jsonify(usuario), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

@app.route("/usuario/perfil", methods=["GET"])
def get_usuario_perfil():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL perfil()")
        usuario = cursor.fetchall() 
        return jsonify(usuario), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# Chamar card_perfil
@app.route("/usuario/card_perfil", methods=["GET"])
def get_card_perfil():
    try:
        data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
        CALL card_perfil(%s)
        """, (data['usuario'],))
        cards_perfil = cursor.fetchall() 
        return jsonify(cards_perfil), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# Chamar card_perfil_completo
@app.route("/usuario/card_perfil_completo", methods=["GET"])
def get_card_perfil_completo():
    try:
        data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
        CALL card_perfil_comleto(%s)
        """, (data['usuario'],))
        cards_perfil = cursor.fetchall() 
        return jsonify(cards_perfil), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()


# TELA PESQUISA
# Chamar card_perquisa
#Procedure:
# delimiter //

# CREATE PROCEDURE pesquisa()
# BEGIN
# 	SELECT foto FROM usuario;
# END //

# delimiter ;

#Back-End:
@app.route("/pesquisa/card_pesquisa", methods=["GET"])
def get_card_pesquisa():
    try:
        data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
        CALL card_perquisa(%s)
        """, (data['pesquisa'],))
        cards_pequisa = cursor.fetchall() 
        return jsonify(cards_pequisa), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# Chamar perquisa_categoria
#Procedure:
# delimiter //

# CREATE PROCEDURE pesquisa_categoria()
# BEGIN
# 	SELECT nome FROM categoria;
# END //

# delimiter ;

#Back-End:
@app.route("/pesquisa/perquisa_categoria", methods=["GET"])
def get_perquisa_categoria():
    try:
        data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
        CALL perquisa_categoria(%s)
        """, (data['pesquisa'],))
        pesquisa_categorias = cursor.fetchall() 
        return jsonify(pesquisa_categorias), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# Chamar perquisa_usuario
#Procedure:
# delimiter //

# CREATE PROCEDURE pesquisa_usuario()
# BEGIN
# 	SELECT nome, usuario, foto FROM usuario;
# END //

# delimiter ;

#Back-End:
@app.route("/pesquisa/pesquisa_usuario", methods=["GET"])
def get_pesquisa_usuario():
    try:
        data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
        CALL pesquisa_usuario(%s)
        """, (data['pesquisa'],))
        pesquisa_usuarios = cursor.fetchall() 
        return jsonify(pesquisa_usuarios), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()


# TELA CADASTRO
# Criado usuario
@app.route("/usuario/cadastrar", methods=['POST'])
def criar_usuario():
    load_dotenv()
    nome = request.form.get('nome')
    usuario = request.form.get('usuario')
    senha = request.form.get('senha')
    email = request.form.get('email')
    
    img = request.files.get('img')
    conn = get_connection()
    cursor = conn.cursor()
    if img:
        img_path = os.path.join(os.getenv("IMG_PATH"), img.filename)  # colocar caminho para salvar img no servidor
        img.save(img_path)
        cursor.execute("""
        INSERT INTO usuario(nome, usuario, senha, email, foto)
        VALUES (%s, %s, %s, %s, %s)
        """, (nome, usuario, senha, email, img_path))
    else:
        cursor.execute("""
        INSERT INTO usuario(nome, usuario, senha, email)
        VALUES (%s, %s, %s, %s)
        """, (nome, usuario, senha, email))
    conn.commit()
    return jsonify({"message": "Usuario criado com sucesso"}), 201

# Criado postagem
@app.route("/postagem", methods=['POST'])
def criar_usuario():
    load_dotenv()
    usuario = request.form.get('usuario')
    categoria = request.form.get('categoria')
    legenda = request.form.get('leganda')
    receita = request.form.get('receita')
    
    img = request.files.get('img')
    conn = get_connection()
    cursor = conn.cursor()
    if img:
        img_path = os.path.join(os.getenv("IMG_PATH"), img.filename)  # colocar caminho para salvar img no servidor
        img.save(img_path)
        cursor.execute("""
        INSERT INTO usuario(usuario, categoria, foto, legenda, receita)
        VALUES (%s, %s, %s, %s, %s)
        """, (usuario, categoria, img_path, legenda, receita))
    elif img:
        img_path = os.path.join(os.getenv("IMG_PATH"), img.filename)  # colocar caminho para salvar img no servidor
        img.save(img_path)
        cursor.execute("""
        INSERT INTO usuario(usuario, categoria, foto, legenda)
        VALUES (%s, %s, %s, %s)
        """, (usuario, categoria, img_path, legenda))
    elif img:
        img_path = os.path.join(os.getenv("IMG_PATH"), img.filename)  # colocar caminho para salvar img no servidor
        img.save(img_path)
        cursor.execute("""
        INSERT INTO usuario(usuario, categoria, foto, receita)
        VALUES (%s, %s, %s, %s)
        """, (usuario, categoria, img_path, receita))
    else:
        cursor.execute("""
        INSERT INTO usuario(usuario, categoria, foto)
        VALUES (%s, %s, %s)
        """, (usuario, categoria, img_path))
    conn.commit()
    return jsonify({"message": "Usuario criado com sucesso"}), 201

# Buscar publicacação
@app.route("/postagem", methods=["GET"])
def get_postagem():
    try:
        data = request.form
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""SELECT u.usuario, p.foto
        FROM postagem p
        INNER JOIN usuario u
        ON p.id_usuario = u.id""")
        postagem = cursor.fetchall() 
        return jsonify(postagem), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# # Criar uma publicação
# @app.route("/postagem", methods=["POST"])
# def criar_postagem():
#     load_dotenv()
#     id_usuario = request.form.get('id_usuario')
#     id_categoria = request.form.get('id_categoria')
#     legenda = request.form.get('legenda')
#     id_receita = request.form.get('id_receita')

#     img = request.files.get('foto')
#     conn = get_connection()
#     cursor = conn.cursor()
#     img_path = os.path.join(os.getenv("IMG_PATH"), img.filename)
#     img.save(img_path)
#     cursor.execute("""
#     INSERT INTO postagem(id_usuario, id_categoria, foto, legenda, id_receita)
#     VALUES (%s, %s, %s, %s, %s)
#     """, (id_usuario, id_categoria, img_path, legenda, id_receita))
#     conn.commit()
#     return jsonify({"message": "Usuario criado com sucesso"}), 201

# Buscar categoria
@app.route("/categoria", methods=["GET"])
def buscar_categoria():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM categoria")
        categoria = cursor.fetchall() 
        return jsonify(categoria), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch categories"}), 500

    finally:
        cursor.close()
        conn.close()

# Buscar receita
@app.route("/receita", methods=["GET"])
def buscar_receita():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM receita")
        receita = cursor.fetchall() 
        return jsonify(receita), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch recipes"}), 500

    finally:
        cursor.close()
        conn.close()

# Criar uma receita
@app.route("/receita", methods=["POST"])
def criar_receita():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO receita(texto)
    VALUES (%s)
    """, (data['texto'],))
    conn.commit()
    return jsonify({"message": "Receita criada com sucesso"}), 201

if __name__ == '__main__':
    app.run(debug=True)
