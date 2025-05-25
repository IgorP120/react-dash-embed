# Embed full-scale React app into Plotly Dash app

## React app is fully independent, yet it can share all Plotly authentication and authorization settings, as well as the server-side data.

### Install

`python -m venv venv`

`source venv/bin/activate`

`pip install -r requirements.txt`

`npm install`

### Run locally

Compile React app and watch for changes:<br />
`npm run dev`

Start Plotly Dash app from a different terminal window:<br />
`python app.py`

In web browser open `http://127.0.0.1:8050`


### Deploy to prod

Compile React app in prod mode:<br />
`npm run build`

