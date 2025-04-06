from dash import Dash, html, dcc, callback, Output, Input
import plotly.express as px
import pandas as pd
from dash_extensions import EventListener
from dash_extensions.javascript import assign
# from callbacks.client_callback import register_client_callback

df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminder_unfiltered.csv')

app = Dash(external_scripts=['assets/react_app.js'])  # Load the React app script
app.title = 'Dash App with React Component'

page_load_event_handler = assign("""
    function(event) {
        console.log('Page loaded!');
        alert('Welcome to the Dash App!');
    }
""")

# Requires Dash 2.17.0 or later
app.layout = [
    html.H1(children='Title of Dash App', style={'textAlign':'center'}),
    dcc.Dropdown(df.country.unique(), 'Canada', id='dropdown-selection'),
    dcc.Graph(id='graph-content'),
    html.Div(id='react-app-container'),
    EventListener(
        id="event-listener",
        events=[{ "event": "load", "props": { "id": "page-load", "handler": page_load_event_handler }}],
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

if __name__ == '__main__':
    app.run(debug=True)
