from flet import Page, View
from freshPhoto.main.constructor.constructorLogin import constructorLogin

def start(page: Page):
    page.title = 'Sistema Bancario'

    def modificarRota(rota):
        page.views.clear()

        page.views.append(
            View(
                route='/',
                controls=[
                    constructorLogin()
                ]
            )
        )

        page.update()

    page.on_route_change = modificarRota
    page.go(page.route)
