from flet import (UserControl, ElevatedButton, ButtonStyle, TextField, Image, Row,
                  ResponsiveRow, Column, MainAxisAlignment, Text, MaterialState,
                  RoundedRectangleBorder, alignment, Container, ImageRepeat, ImageFit)
from utils.paletaCores import CoresAplicacao


class ViewCadastro(UserControl):
    def __init__(self):
        super().__init__()
        self.cores = CoresAplicacao()

        self.fundo = Container(image_src='img_fundo.png', image_repeat=ImageRepeat.NO_REPEAT,
                               image_fit=ImageFit.COVER)

        self.titulo = Text(value='Fresh Photo',
                           size=30,
                           color=self.cores.corPreta)

        self.img_fundo = Image(src='img_fundo.png')

        self.btn_voltar = Image(src='btn_voltar.png', width=55)

        self.img_cadastrar = Image(src='img_cadastrar.png')

        self.t_field_nome = TextField(label='Nome',
                                      border_radius=8,
                                      width=450, height=45,
                                      color=self.cores.corPreta)

        self.t_field_usuario = TextField(label='Usuario',
                                         border_radius=8,
                                         width=450, height=45,)

        self.t_field_senha = TextField(label='Senha',
                                       password=True, can_reveal_password=True,
                                       border_radius=8,
                                       width=450, height=45)

        self.t_field_email = TextField(label='E-mail',
                                       border_radius=8,
                                       width=450, height=45)

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

        linhaBtnVoltar = Row(col={'xs': 6, 'sm': 2, 'md': 3},
                             controls=[self.btn_voltar],
                             alignment=MainAxisAlignment.START)

        linhaBtnEntrar = Row(col={'xs': 6, 'sm': 2, 'md': 3},
                             controls=[self.btn_cadastrar])

        layout = ResponsiveRow(
            height=1000,
            controls=[
                Column(col={'xs': 10, 'sm': 8, 'md': 6, 'lg': 5, 'xl': 3},
                       controls=[
                           Column(col={'sm': 12, 'md': 8},
                                  controls=[linhaBtnVoltar]),  # fim do campo do botao voltar
                           Column(col={'xs': 6, 'sm': 5, 'md': 5, 'lg': 5, 'xl': 5},
                                  controls=[linhaImgCadastrar],
                                  alignment=alignment.center),  # fim do campo da logo
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

        self.fundo.content = layout

        return self.fundo
