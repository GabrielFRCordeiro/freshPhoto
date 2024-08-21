from flet import (UserControl, ElevatedButton, ButtonStyle, TextField, Image, Row,
                  ResponsiveRow, Column, MainAxisAlignment, Text, MaterialState,
                  RoundedRectangleBorder, alignment)
from utils.paletaCores import CoresAplicacao


class ViewCadastro(UserControl):
    def __init__(self):
        super().__init__()
        self.cores = CoresAplicacao()

        self.titulo = Text('Fresh Photo',
                           size=30,
                           color=self.cores.corPreta)

        self.img_cadastrar = Image(src='img_cadastrar.png')

        self.t_field_nome = TextField(label='Nome',
                                      border_radius=8,
                                      width=310, height=45)

        self.t_field_usuario = TextField(label='Usuario',
                                         border_radius=8,
                                         width=310, height=45)

        self.t_field_senha = TextField(label='Senha',
                                       password=True, can_reveal_password=True,
                                       border_radius=8,
                                       width=310, height=45)

        self.t_field_email = TextField(label='E-mail',
                                       border_radius=8,
                                       width=310, height=45)

        self.btn_cadastrar = ElevatedButton(text='Cadastrar',
                                            expand=True,
                                            style=ButtonStyle(
                                                color=self.cores.corBranca,
                                                bgcolor={
                                                    MaterialState.DEFAULT: self.cores.verdePrimaria,
                                                    MaterialState.HOVERED: self.cores.verdeSecundaria
                                                }, shape=RoundedRectangleBorder(radius=8)
                                            ), width=140, height=65)

    def build(self):

        linhaImgCadastrar = Row(controls=[self.img_cadastrar], alignment=MainAxisAlignment.CENTER)

        linhaBtnEntrar = Row(col={'xs': 6, 'sm': 2, 'md': 3},
                             controls=[self.btn_cadastrar])
        layout = ResponsiveRow(
            controls=[
                Column(col={'xs': 10, 'sm': 8, 'md': 6, 'lg': 5, 'xl': 3},
                       controls=[
                           Column(col={'xs': 6, 'sm': 5, 'md': 5, 'lg': 5, 'xl': 5},
                                  controls=[linhaImgCadastrar],
                                  alignment=alignment.center),
                           Column(col={'sm': 12, 'md': 8},
                                  controls=[self.titulo,
                                            self.t_field_nome,
                                            self.t_field_usuario,
                                            self.t_field_senha,
                                            self.t_field_email,
                                            linhaBtnEntrar
                                            ])  # fim da coluna do campo de entrada em botoes
                       ], alignment=MainAxisAlignment.CENTER
                       )  # fim da minha coluna principal
            ], alignment=MainAxisAlignment.CENTER
        )  # fim da minha linha responsiva

        return layout
