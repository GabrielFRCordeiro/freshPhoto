from flet import (UserControl, ElevatedButton, TextField, icons, Image)


class ViewCadastro(UserControl):
    def __init__(self):
        super().__init__()
        self.img_usuario = Image(src='usuario_cadastrar.png')
        self.t_field_nome = TextField(label='Nome')
        self.t_field_usuario = TextField(label='Usuario', icon=icons.SUPERVISED_USER_CIRCLE_ROUNDED)
        self.t_field_senha = TextField(label='Senha', icon=icons.PASSWORD_ROUNDED)
        self.t_field_email = TextField(label='E-mail', icon=icons.ATTACH_EMAIL_ROUNDED)
        self.btn_cadastrar = ElevatedButton(text='Cadastrar', icon=icons.APP_REGISTRATION_ROUNDED)
