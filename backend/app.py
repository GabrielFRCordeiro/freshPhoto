from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

# TELA LOGIN #
# logar
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

# -------------------------------------------------------------------------------------------------------- #

# TELA CADASTRAR #
# verificar cadastro no sistema
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


# criar um novo usuario
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

# -------------------------------------------------------------------------------------------------------- #

# TELA HOME #
@app.route("/home", methods=["GET"])
def get_card_postado_home():
    try:
        data = request.form
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL card_postado()")
        postagem = cursor.fetchall() 
        return jsonify(postagem), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# -------------------------------------------------------------------------------------------------------- #

# TELA FEED #
@app.route("/feed", methods=["GET"])
def get_feed():
    try:
        data = request.form
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
        CALL feed_perfil(%s)
        """, (data['usuario'],))
        postagem = cursor.fetchall() 
        return jsonify(postagem), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# -------------------------------------------------------------------------------------------------------- #

# TELA PEFIL OUTRO USUARIO #
# pegando informaçõesde um usuario especifico
@app.route("/outro-usuario/perfil", methods=["GET"])
def get_outro_usuario_perfil():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT nome, usuario, foto FROM perfil")
        usuario = cursor.fetchall() 
        return jsonify(usuario), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()


# chamar card_perfil_outro_usuario
@app.route("/usuario/card_perfil_outro_usuario", methods=["GET"])
def get_card_perfil_outro_usuario():
    try:
        data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
        CALL card_perfil_outro_usuario(%s)
        """, (data['usuario'],))
        cards_perfil = cursor.fetchall() 
        return jsonify(cards_perfil), 200
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

@app.route("/usuario/user", methods=["GET"])
def get_todas_informacoes_usuario():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario")
    usuario = cursor.fetchall() 
    return jsonify(usuario), 200

# -------------------------------------------------------------------------------------------------------- #

# TELA PERFIL USUARIO #
# pegando as informações do perfil do usuario
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

# -------------------------------------------------------------------------------------------------------- #

# TELA MINHA CONTA #
# atualizar foto de perfil
@app.route('/usuario/foto', methods=['PUT'])
def update_user_photo(id):
    img = request.files.get('img')
    img_path = os.path.join(os.getenv("IMG_PATH"), img.filename)  # colocar caminho para salvar img no servidor
    img.save(img_path)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE usuario SET foto=%s", (img))
    conn.commit()
    return jsonify({"message": "User updated successfully"}), 200


# atualizar nome
@app.route('/usuario/nome', methods=['PUT'])
def update_user_name(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE usuario SET nome", (data['name'], ))
    conn.commit()
    return jsonify({"message": "User updated successfully"}), 200


# atualizar usuario
@app.route('/usuario/usuario', methods=['PUT'])
def update_user_user(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE usuario SET usuario", (data['user'], ))
    conn.commit()
    return jsonify({"message": "User updated successfully"}), 200


# atualizar senha
@app.route('/usuario/senha/<int:id>', methods=['PUT'])
def update_user_password(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE usuario SET senha WHERE id=%s", (data['password'], id))
    conn.commit()
    return jsonify({"message": "User updated successfully"}), 200


# atualizar email
@app.route('/usuario/email', methods=['PUT'])
def update_user_email(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE usuario SET email", (data['email'], ))
    conn.commit()
    return jsonify({"message": "User updated successfully"}), 200


# deletar usuario completo
@app.route('/usuario', methods=['DELETE'])
def delete_user(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuario WHERE id=%s", (id,))
    conn.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# -------------------------------------------------------------------------------------------------------- #

# TELA SEGUIDORES #
# pegar cards postados
@app.route("/seguidores", methods=["GET"])
def get_card_postado_seguidores():
    try:
        data = request.form
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
        CALL card_postado(%s)
        """, (data['usuario'],))
        postagem = cursor.fetchall() 
        return jsonify(postagem), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()


# metodo GET para pegar as informações do usuario que esta seguindo
@app.route("/seguindo", methods=["GET"])
def verificar_seguidores():
    try:
        data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM seguidores WHERE id_seguidor=%s", (data['seguidor']))
        usuario = cursor.fetchall() 
        return jsonify(usuario), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()


# metodo POST para salvar no banco de dados
@app.route("/seguidores", methods=["POST"])
def seguir():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO seguidores(id_seguidor, id_seguindo)
    VALUES (%s, %s)
    """, (data['id_seguidor'], data['id_seguindo']))
    conn.commit()
    return jsonify({"message": "Seguindo com sucesso"}), 201


# metodo DELETE para deletar as informações do banco de dados quando deixar de seguir
@app.route("/seguidores", methods=["DELETE"])
def deixar_de_seguir(id_seguidor, id_seguindo):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM seguidores WHERE (%s, %s)", (id_seguidor, id_seguindo))
    conn.commit()
    return jsonify({"message": "Deixado de seguir com sucesso"}), 200

# -------------------------------------------------------------------------------------------------------- #

# TELA PUBLICAR #
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

# criar uma postagem
@app.route("/postagem", methods=['POST'])
def criar_postagem():
    load_dotenv()
    usuario = request.form.get('usuario')
    categoria = request.form.get('categoria')
    receita = request.form.get('receita')
    
    img = request.files.get('img')
    conn = get_connection()
    cursor = conn.cursor()
    if img:
        img_path = os.path.join(os.getenv("IMG_PATH"), img.filename)  # colocar caminho para salvar img no servidor
        img.save(img_path)
        cursor.execute("""
        INSERT INTO postagem(id_usuario, categoria, foto, receita)
        VALUES (%s, %s, %s, %s, %s)
        """, (usuario, categoria, img_path, receita))
    else:
        cursor.execute("""
        INSERT INTO postagem(id_usuario, categoria, foto)
        VALUES (%s, %s, %s)
        """, (usuario, categoria, img_path))
    conn.commit()
    return jsonify({"message": "Usuario criado com sucesso"}), 201


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


if __name__ == '__main__':
    app.run(debug=True)