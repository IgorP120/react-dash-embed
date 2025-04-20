import json
from ..decorators.endpoint import endpoint


def register_endpoints(app):

    @endpoint(app, "test1")
    def test1_endpoint(body):
        payload = json.loads(body)
        res = { "test1": "ok", "payload": payload }
        return [res]

