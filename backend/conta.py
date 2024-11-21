class Conta:

    def __init__(self,id:int, nome:str, email:str, senha:str, arroba:str, foto):
        self.id = id
        self.__nome = nome
        self.__email = email
        self.__senha = senha
         self.__arroba = arroba
        self.foto = foto

        @property
        def nome(self):
            return self.__nome

        @property
        def email(self):
            return self.__email

        @property
        def senha(self):
            return self.__senha

        @property
        def arroba(self):
            return self.__arroba

        @nome.setter
        def nome(self, novoNome):
            self.__nome = novoNome

        @email.setter
        def email(self, novoEmail):
            self.__email = novoEmail

        @senha.setter
        def nome(self, novaSenha):
            self.__senha = novaSenha

        @arroba.setter
        def nome(self, novoArroba):
            self.__arroba = novoArroba
       
