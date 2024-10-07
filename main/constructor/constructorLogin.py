from freshPhoto.views.viewLogin import ViewLogin
from controller.controllerLogin import ControllerLogin


def constructorLogin():
    telaLogin = ViewLogin()
    controllerLogin = ControllerLogin(telaLogin)

    return telaLogin
