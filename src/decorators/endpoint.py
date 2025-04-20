from dash import Output, Input

# Custom decorator, to simplify things.
def endpoint(app, endpoint_name):
    def decorator(func):
        return app.callback([Output(endpoint_name, "data"), Input("body", "value")], prevent_initial_call=True)(func)
    return decorator


