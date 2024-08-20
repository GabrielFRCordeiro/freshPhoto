from freshPhoto.views.viewLogin import ViewLogin


class ControllerLogin:
    def __init__(self, telaLogin: ViewLogin) -> None:
        self.telaLogin = telaLogin
        self.t_field_login = telaLogin.t_field_login
        self.t_field_senha = telaLogin.t_field_senha
        self.btnEntrar = telaLogin.btn_enter
        self.btnEntrar.on_click = self.logar

    def logar(self, e):
        cadastrados = {
            'login': ['carlos', 'tita', 'gerberto'],
            'senha': ['1111', '3434', '2971']
        }

        for ind, login in enumerate(cadastrados['login']):
            if self.t_field_login.value == login:
                self.t_field_login.error_text = ''
                self.t_field_login.update()
                for j, senha in enumerate(cadastrados['senha']):
                    if (self.t_field_senha.value == senha) and j == ind:
                        self.telaLogin.page.go('/cadastrar')
                    else:
                        self.t_field_senha.error_text = 'Senha invalida!'
                        self.t_field_senha.update()
            else:
                self.t_field_login.error_text = 'Login invalido!'
                self.t_field_login.update()
