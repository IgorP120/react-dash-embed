import json
import pandas as pd
from ..decorators.endpoint import endpoint

def register_endpoints(app):

    @endpoint(app, "get-people")
    def get_people(body):
        # this data could be coming from any source, like Databricks
        data = [
            {"id": 1, "name": "Emma Johnson", "age": 42, "city": "Toronto"},
            {"id": 2, "name": "Liam Smith", "age": 19, "city": "Seattle"},
            {"id": 3, "name": "Olivia Brown", "age": 67, "city": "Vancouver"},
            {"id": 4, "name": "Noah Davis", "age": 31, "city": "Chicago"},
            {"id": 5, "name": "Ava Wilson", "age": 28, "city": "Montreal"},
            {"id": 6, "name": "William Taylor", "age": 53, "city": "New York"},
            {"id": 7, "name": "Sophia Martinez", "age": 76, "city": "Calgary"},
            {"id": 8, "name": "James Anderson", "age": 22, "city": "Los Angeles"},
            {"id": 9, "name": "Isabella Thomas", "age": 45, "city": "Ottawa"},
            {"id": 10, "name": "Benjamin Lee", "age": 34, "city": "Boston"},
            {"id": 11, "name": "Mia White", "age": 88, "city": "Edmonton"},
            {"id": 12, "name": "Lucas Harris", "age": 17, "city": "San Francisco"},
            {"id": 13, "name": "Charlotte Clark", "age": 61, "city": "Winnipeg"},
            {"id": 14, "name": "Henry Lewis", "age": 29, "city": "Miami"},
            {"id": 15, "name": "Amelia Walker", "age": 50, "city": "Quebec City"},
            {"id": 16, "name": "Alexander Hall", "age": 72, "city": "Denver"},
            {"id": 17, "name": "Harper Allen", "age": 25, "city": "Halifax"},
            {"id": 18, "name": "Michael Young", "age": 39, "city": "Austin"},
            {"id": 19, "name": "Evelyn King", "age": 83, "city": "Victoria"},
            {"id": 20, "name": "Daniel Scott", "age": 47, "city": "Phoenix"},
        ]
        return [data]

    @endpoint(app, "get-population-data")
    def get_population(body):
        df = pd.read_csv(
            "https://raw.githubusercontent.com/plotly/datasets/master/gapminder_unfiltered.csv"
        )
        return [df]

    @endpoint(app, "test1")
    def test1_endpoint(body):
        payload = json.loads(body)
        res = { "test1": "ok", "payload": payload }
        return [res]
