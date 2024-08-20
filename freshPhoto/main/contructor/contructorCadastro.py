from freshPhoto.view.viewCadastro import ViewCadastro
from freshPhoto.controller.controllerCadastro import ControllerCadastro


def constructorCadastro():
    telaCadastro = ViewCadastro()
    controllerCadastro = ControllerCadastro(telaCadastro)

    return telaCadastro
