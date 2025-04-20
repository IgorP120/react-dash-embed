from src.dash import dash_app
from src.api.endpoints import register_endpoints

app = dash_app.init()

register_endpoints(app)

if __name__ == '__main__':
    app.run(debug=False)
