from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

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

# Criado usuario
@app.route("/usuario", methods=['POST'])
def criar_usuario():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO usuario(nome, usuario, senha, email)
    VALUES (%s, %s, %s, %s)
    """, (data["nome"], data["usuario"], data["senha"], data["email"]))
    conn.commit()
    return jsonify({"message": "Usuario criado com sucesso"}), 201

# Criar uma publicação
@app.route("/postagem", methods=["POST"])
def criar_postagem():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO postagem(id_usuario, id_categoria, foto, legenda)
    VALUES (%s, %s, %s, %s)
    """, (data["id_usuario"], data["id_categoria"], data["foto"], data["legenda"]))
    conn.commit()
    return jsonify({"message": "Usuario criado com sucesso"}), 201

if __name__ == '__main__':
    app.run(debug=True)
