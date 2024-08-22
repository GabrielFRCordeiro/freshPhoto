from flet import app, WEB_BROWSER
from main.handle_process import start

if __name__ == '__main__':
    app(start, assets_dir='assets', view=WEB_BROWSER)
