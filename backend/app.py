import base64
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
@app.route("/usuario/cadastrar", methods=["POST"])
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
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL retornarTodosPosts()")
        postagem = cursor.fetchall()

        for p in postagem:
            if p.get('usuario_foto'):
                with open(p['usuario_foto'], 'rb') as img_usuario:
                    img_data = base64.b64encode(img_usuario.read()).decode('utf-8')
                p['usuario_base64'] = img_data
            else:
                with open(os.getenv("IMG_USER"), 'rb') as img_file:
                    img_data = base64.b64encode(img_file.read()).decode('utf-8')
                p['usuario_base64'] = img_data
            
            if p.get('postagem_foto'):
                with open(p['postagem_foto'], 'rb') as img_postagem:
                    img_data = base64.b64encode(img_postagem.read()).decode('utf-8')
                p['postagem_base64'] = img_data
            else:
                p['postagem_base64'] = None
            
        return jsonify(postagem), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# -------------------------------------------------------------------------------------------------------- #

# TELA FEED #
@app.route("/feed/<int:id>", methods=["GET"])
def get_feed(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL retornarPostsUsuario(%s) ", (id,))
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

# pegar informações do usuario
@app.route("/usuario/user/<string:usuario>", methods=["GET"])
def get_todas_informacoes_usuario(usuario):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE usuario=%s", (usuario,))
    data_usuario = cursor.fetchall()
    return jsonify(data_usuario), 200

# -------------------------------------------------------------------------------------------------------- #

# TELA PERFIL USUARIO #
# Pegando as informações do perfil do usuario
@app.route("/usuario/perfil/<int:id>", methods=["GET"])
def get_usuario_perfil(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL perfil(%s)", (id,))
        usuario = cursor.fetchall()
        if usuario[0]['foto'] and type(usuario[0]['foto']) != None:
            with open(usuario[0]['foto'], 'rb') as img_file:
                img_data = base64.b64encode(img_file.read()).decode('utf-8')

            # Adicionar a imagem em base64 no dicionário de resposta
            usuario[0]['foto_base64'] = img_data
            return jsonify(usuario), 200

        else:
            with open(os.getenv("IMG_USER"), 'rb') as img_file:
                img_data = base64.b64encode(img_file.read()).decode('utf-8')

            # Adicionar a imagem em base64 no dicionário de resposta
            usuario[0]['foto_base64'] = img_data
            return jsonify(usuario), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# Chamar card_perfil
@app.route("/usuario/retornarPostsUsuario/<int:id>", methods=["GET"])
def get_card_perfil(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL retornarPostsUsuario(%s)", (id,))
        cards_perfil = cursor.fetchall()

        for cp in cards_perfil:

            # Verifique se o caminho da foto do usuário não é None ou vazio
            if cp.get('usuario_foto'):
                with open(cp['usuario_foto'], 'rb') as img_usuario:
                    img_data = base64.b64encode(img_usuario.read()).decode('utf-8')   # Codifica para base64 e depois decodifica como string
                cp['usuario_base64'] = img_data
            else:
                cp['usuario_base64'] = None    # Ou outro valor padrão, se necessário
            
            # Verifique se o caminho da foto da postagem não é None ou vazio
            if cp.get('postagem_foto'):
                with open(cp['postagem_foto'], 'rb') as img_postagem:
                    img_data = base64.b64encode(img_postagem.read()).decode('utf-8')  # Codifica para base64 e depois decodifica como string
                cp['postagem_base64'] = img_data
            else:
                cp['postagem_base64'] = None    # Ou outro valor padrão, se necessário
            
        return jsonify(cards_perfil), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# -------------------------------------------------------------------------------------------------------- #

# TELA MINHA CONTA #

# atualizar senha
@app.route('/usuario/AtualizarSenha/<int:id>', methods=["PUT"])
def update_user_password(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("CALL AtualizarSenha(%s, %s)", (id, data['password']))
    conn.commit()
    return jsonify({"message": "User updated successfully"}), 200


# deletar usuario completo
@app.route('/usuario/ApagarContaUsuario/<int:id>', methods=['DELETE'])
def delete_user(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuario WHERE id=%s", (id,))
    conn.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# -------------------------------------------------------------------------------------------------------- #

# TELA SEGUIDORES #
# pegar cards postados
@app.route("/seguindo/obterFotosSeguidos/<int:id>", methods=["GET"])
def get_card_postado_seguidores(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL obterFotosSeguidos(%s)", (id,))
        postagem = cursor.fetchall()
        for p in postagem:
            if p.get('usuario_foto'):
                with open(p['usuario_foto'], 'rb') as img_usuario:
                    img_data = base64.b64encode(img_usuario.read()).decode('utf-8')
                p['usuario_base64'] = img_data
            else:
                with open(os.getenv("IMG_USER"), 'rb') as img_file:
                    img_data = base64.b64encode(img_file.read()).decode('utf-8')
                p['usuario_base64'] = img_data
            
            if p.get('postagem_foto'):
                with open(p['postagem_foto'], 'rb') as img_postagem:
                    img_data = base64.b64encode(img_postagem.read()).decode('utf-8')
                p['postagem_base64'] = img_data
            else:
                p['postagem_base64'] = None

        return jsonify(postagem), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()


# metodo GET para pegar as informações do usuario que esta seguindo
@app.route("/seguindo/<int:id>", methods=["GET"])
def verificar_seguidores(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM seguindo WHERE seguidos_id=%s", (id,))
        usuario = cursor.fetchall() 
        return jsonify(usuario), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# chamando procedure retornarUsuariosPrincipais
@app.route("/seguindo", methods=["GET"])
def get_retornarUsuariosPrincipais():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL retornarUsuariosPrincipais()")
        usuario = cursor.fetchall()
        for u in usuario:
            if u.get('usuario_foto'):
                with open(u['usuario_foto'], 'rb') as img_usuario:
                    img_data = base64.b64encode(img_usuario.read()).decode('utf-8')
                u['usuario_base64'] = img_data
            else:
                u['usuario_base64'] = None

        return jsonify(usuario), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()


# metodo POST para salvar no banco de dados
@app.route("/seguindo", methods=["POST"])
def seguir():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO seguindo(seguido_id, seguidos_id)
    VALUES (%s, %s)
    """, (data['seguido_id'], data['seguidos_id']))
    conn.commit()
    return jsonify({"message": "Seguindo com sucesso"}), 201


# metodo DELETE para deletar as informações do banco de dados quando deixar de seguir
@app.route("/seguindo", methods=["DELETE"])
def deixar_de_seguir():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM seguindo WHERE seguido_id = %s AND seguidos_id = %s", (data['seguido_id'], data['seguidos_id']))
    conn.commit()
    return jsonify({"message": "Deixado de seguir com sucesso"}), 200

# -------------------------------------------------------------------------------------------------------- #

# TELA PUBLICAR #
# Buscar publicacação
@app.route("/postagem/<int:id>", methods=["GET"])
def get_postagem(id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""SELECT u.usuario, p.foto
        FROM postagem p
        INNER JOIN usuario u
        ON p.id_usuario = u.id""",)
        postagem = cursor.fetchall() 
        return jsonify(postagem), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to fetch products"}), 500

    finally:
        cursor.close()
        conn.close()

# criar uma postagem
@app.route("/postagem", methods=["POST"])
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
        VALUES (%s, %s, %s, %s)
        """, (usuario, categoria, img_path, receita))
    else:
        cursor.execute("""
        INSERT INTO postagem(id_usuario, categoria, foto)
        VALUES (%s, %s, %s)
        """, (usuario, categoria, img_path))
    conn.commit()
    return jsonify({"message": "Usuario criado com sucesso"}), 201


# Buscar receita
@app.route("/postagem/receita/<int:id_postagem>", methods=["GET"])
def buscar_receita(id_postagem):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("CALL retornaReceitaPost(%s)", (id_postagem,))
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