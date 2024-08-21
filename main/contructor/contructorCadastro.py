from view.viewCadastro import ViewCadastro
from controller.controllerCadastro import ControllerCadastro


def constructorCadastro():
    telaCadastro = ViewCadastro()
    controllerCadastro = ControllerCadastro(telaCadastro)

    return telaCadastro
