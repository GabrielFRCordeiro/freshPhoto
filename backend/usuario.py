class Usuaio:

    def __init__(self, nome, senha):
        self.__nome = nome
        self.__senha = senha

    @property
    def nome(self):
        return self.__nome

    @nome.setter
    def nome(self, novoNome):
        self.__nome = novoNome
