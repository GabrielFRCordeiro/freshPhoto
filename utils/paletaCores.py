class CoresAplicacao:
    def __init__(self) -> None:
        self.__vermelhaPrimaria: str = '#FD0C12'
        self.__vermelhaSecundaria: str = '#FE989B'
        self.__verdePrimaria: str = '#7CB930'
        self.__verdeSecundaria: str = '#299F23'
        self.__corBranca: str = '#ffffff'
        self.__corPreta: str = '#000000'

    @property
    def vermelhaPrimaria(self) -> str:
        """
        Constante para retornar a cor primaria
        :return: str
        """
        return self.__vermelhaPrimaria

    @property
    def vermelhaSecundaria(self) -> str:
        """
        Constante para retornar a cor secundaria
        :return: str
        """
        return self.__vermelhaSecundaria

    @property
    def verdePrimaria(self) -> str:
        """
        Constante para retornar a cor hover dos botões
        :return: str
        """
        return self.__verdePrimaria

    @property
    def verdeSecundaria(self) -> str:
        """
        Constante para retornar a cor default dos botões
        :return: str
        """
        return self.__verdeSecundaria

    @property
    def corBranca(self) -> str:
        """
        Constante para retornar a cor branca
        :return: str
        """
        return self.__corBranca

    @property
    def corPreta(self) -> str:
        """
        Constante para retornar a cor branca
        :return: str
        """
        return self.__corPreta