from dash import Dash, html, dcc, callback, Output, Input
import plotly.express as px
import pandas as pd
from dash_extensions import EventListener
from dash_extensions.javascript import assign
# from callbacks.client_callback import register_client_callback
import json

from src.decorators.endpoint import endpoint

df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminder_unfiltered.csv')

dash_app = Dash(suppress_callback_exceptions=True, external_scripts=['assets/react_app.js', 'assets/onload.js'])  # Load the React app script
dash_app.title = 'Dash App with React Component'

page_load_event_handler = assign("""
    function(event) {
        console.log('Page loaded!');
        alert('Welcome to the Dash App!');
    }
""")

# Requires Dash 2.17.0 or later
dash_app.layout = [
    html.H1(children='Title of Dash App', style={'textAlign':'center'}),
    dcc.Dropdown(df.country.unique(), 'Canada', id='dropdown-selection'),
    dcc.Graph(id='graph-content'),
    dcc.Input(id='body', type='hidden', value='{}'),  # Hidden input to trigger the callback
    html.Div(id='react-app-container'),
    EventListener(
        id="event-listener",
        events=[{"event": "DOMContentLoaded", "props": {}, "handler": page_load_event_handler}],
        children=[]
    )
]

@callback(
    Output('graph-content', 'figure'),
    Input('dropdown-selection', 'value')
)
def update_graph(value):
    dff = df[df.country==value]
    return px.line(dff, x='year', y='pop')




# register_client_callback(app)
@endpoint(dash_app, "test1")
def test1_endpoint(body):
    payload = json.loads(body)
    res = { "test1": "ok", "payload": payload }
    return [res]




if __name__ == '__main__':
    dash_app.run(debug=True)
