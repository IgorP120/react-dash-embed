from dash import Dash, html, dcc, callback, Output, Input
import plotly.express as px
import pandas as pd

from src.api.endpoints import register_endpoints

df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminder_unfiltered.csv')

dash_app = Dash(suppress_callback_exceptions=True, external_scripts=['assets/react_app.js', 'assets/onload.js'])  # Load the React app script
dash_app.title = 'Dash App with Embedded React App'

# Requires Dash 2.17.0 or later
dash_app.layout = [
    # Dash app, just as an example. Can be removed
    html.H1(children='Title of Dash App', style={'textAlign':'center'}),
    dcc.Dropdown(df.country.unique(), 'Canada', id='dropdown-selection'),
    dcc.Graph(id='graph-content'),

    # Independent React-18 app with access to Dash app's api endpoints
    html.Div(id='react-app-container')
]

@callback(
    Output('graph-content', 'figure'),
    Input('dropdown-selection', 'value')
)
def update_graph(value):
    dff = df[df.country==value]
    return px.line(dff, x='year', y='pop')


register_endpoints(dash_app)


if __name__ == '__main__':
    dash_app.run(debug=True)
