from view.viewCadastro import ViewCadastro


class ControllerCadastro:
    def __init__(self, telaCadastro: ViewCadastro) -> None:
        self.telaLogin = telaCadastro
        self.t_field_nome = telaCadastro.t_field_nome
        self.t_field_usuario = telaCadastro.t_field_usuario
        self.t_field_senha = telaCadastro.t_field_senha
        self.t_field_email = telaCadastro.t_field_email
        self.btnEntrar = telaCadastro.btn_cadastrar
