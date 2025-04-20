# Fully independent React app can be embedded into the Plotly Dash app, sharing the same server-side data

## Install

`python -m venv venv`

`source venv/bin/activate`

`pip install -r requirements.txt`

`npm install`

## Run locally

Compile React app and watch for changes:<br />
`npm run dev`

Start Plotly Dash app from a different terminal window:<br />
`python app.py`

In web browser open `http://127.0.0.1:8050`


## Deploy to prod

Compile React app in prod mode:<br />
`npm run build`

