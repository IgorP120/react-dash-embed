from dash import Output, Input, clientside_callback

def register_client_callback(app):
    app.clientside_callback(
        """
        function(){
            const ctx = dash_clientside.callback_context;
            // console.log('ctx=', ctx);
            // const triggered_id = ctx.triggered_id;
            
            setTimeout(() => {
                const reactRootElement = dash_clientside.react_app.render();
                // console.log('htmlEl=', htmlEl);
                const appContainer = document.getElementById('react-app-container');
                appContainer.appendChild(reactRootElement);
            }, 100);
            
            return 'test';
        }
        """,
        Output("react-app-container", "className"),
        Input("react-app-container", "id")
    )    


# # Serve static assets explicitly to bypass auth, getting HTTP 401 otherwise
# @server.route('/assets/<path:filename>')
# def serve_assets(filename):
#     return send_from_directory('assets', filename)