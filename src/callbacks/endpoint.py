import dash_bootstrap_components as dbc
import dash_design_kit as ddk
from dash import dcc, html, Input, Output, callback, dash_table
from dash.exceptions import PreventUpdate
from src.databricks_queries import trades
import dash_ag_grid as dag 
import time
import json


defaultColDef = {
    "flex": 1,
    'minWidth':120,
    'maxWidth':500,
    'filter': True,
    'resizable': True,
    "sortable": True,
    # 
    # 'filterParams': {'buttons': ['reset'],'applyMiniFilterWhileTyping': True},
    # 'menuTabs':['generalMenuTab', 'filterMenuTab'],
    # 'enableFilter': True,
    # "enableRowGroup": True,
    # "enablePivot": False,
    # 'enableValue': False,
    # "suppressMovable": True,
    # 'resizable': True,
    # "sortable": True,
    # 'cellStyle': {'fontSize': '10px'}
}

tab = dcc.Tab(label='Trades Grid', children= [
    html.Div(children=[
        html.Button('Get Trades', id='load_trade_data', n_clicks=0),
        # html.Button('Get Trades2', id='load_trade_data2', n_clicks=0),
        html.Br(),
        dcc.Loading(
            [html.Div(id="trades_grid")],
            overlay_style={"visibility": "visible", "filter": "blur(2px)"},
            type="default",
        ),

        # dcc.Store(id='data1', storage_type='memory'),
    ]),
])

def render_grid(df):
    columnDefs=[{
        "field": x, 
        "headerName": x,
        "headerTooltip": x,
    } for x in df.columns]

    data=df.to_dict("records")

    # print(data)
    # print(columnDefs)
        
    # see https://dash.plotly.com/dash-ag-grid/styling-themes
    # ag-theme-balham-dark, ag-theme-quartz-dark, ag-theme-alpine-dark
    return html.Div(id='main-grid', children=[
        dag.AgGrid(
            id="main-ag-grid",
            className="ag-theme-balham-dark",
            style={"height": 'calc(100vh - 16rem)'},
            columnDefs=columnDefs,
            defaultColDef=defaultColDef,
            columnSize="responsiveSizeToFit",
            rowData=data
        )]
    )
 
def register_callback(app):


    # Custom decorator, to simplify things. TODO: move it out to the app level
    def endpoint(endpoint_name):
        def decorator(cls):
            return app.callback([Output(endpoint_name, "data"), Input("body", "value")], prevent_initial_call=True)(cls)
        return decorator



    @app.callback(
        [
            Output("trades_grid", "children"),
            Input("load_trade_data", "n_clicks")
        ],
        prevent_initial_call=True,
    )
    def update_trades(n_clicks):
        if n_clicks is None:
            raise PreventUpdate
        if n_clicks > 0:
            # time.sleep(3) # simulate extra delay
            df = trades.get_trades()
            el = render_grid(df)
            return [el]
        else:
            raise PreventUpdate


    @app.callback(
        [
            Output("data1", "data"),
            Input("load_trade_data2", "n_clicks")
        ],
        prevent_initial_call=True,
    )
    def update_trades2(n_clicks):
        if n_clicks is None:
            raise PreventUpdate
        if n_clicks > 0:
            res = { "test5": "ok" }
            return [res]
        else:
            raise PreventUpdate    





    @app.callback([Output("my-endpoint1", "data"), Input("body", "value")], prevent_initial_call=True)
    def endpoint1(body):
        res = { "test101": "ok", "json": body }
        return [res]



    @endpoint("my-endpoint2")
    def endpoint2(body):
        """ Sample Request
        {
            "output": "..my-endpoint2.data..",
            "outputs": [
                {
                    "id": "my-endpoint2",
                    "property": "data"
                }
            ],
            "inputs": [
                {
                    "id": "",
                    "property": "",
                    "value": "{ \"a\": 1}"
                }
            ]
        }

        Response:
        {
            "multi": true,
            "response": {
                "my-endpoint2": {
                    "data": {
                        "test102": "ok",
                        "payload": {
                            "a": 1
                        }
                    }
                }
            }
        }
        """
        payload = json.loads(body)
        res = { "test102": "ok", "payload": payload }
        return [res]
    

    