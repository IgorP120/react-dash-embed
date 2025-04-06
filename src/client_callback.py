from dash import Output, Input

def register_client_callback(app):
    app.clientside_callback(
        """
        function(){
            console.log('callback1');
            const ctx = dash_clientside.callback_context;
            console.log('ctx=', ctx);
            // const triggered_id = ctx.triggered_id;
            
            setTimeout(() => {
                const htmlEl = dash_clientside.my_ag_grid.render();
                console.log('htmlEl=', htmlEl);
                const appContainer = document.getElementById('grid-output');
                appContainer.appendChild(htmlEl);
            }, 100);
            
            return 'test';
        }
        """,
        Output("grid-output", "className"),
        Input("grid-output", "id")
    )    


# # Serve static assets explicitly to bypass auth, getting HTTP 401 otherwise
# @server.route('/assets/<path:filename>')
# def serve_assets(filename):
#     return send_from_directory('assets', filename)