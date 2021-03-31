# Web application using the React library in the frontend, and using the Flask framework as API

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Frontend

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## API

This repository contains some example code from [this project](https://github.com/jwhelland/flask-socketio-celery-example), which in turn is based on [this project](https://github.com/miguelgrinberg/flask-celery-example).  

To setup the API, make sure to `cd api` and then:

0. Create a virtual environment and activate it.

For example, run: `virtualenv -p python3.8 venv && source venv/bin/activate`
1. Install the requirements:

`pip install -r requirements.txt`
2. Start a local Redis server.

For example, if you are on Linux or Mac, execute `./run-redis.sh` to install and launch a private copy.
3. Start a Celery worker by running:

`celery -A app.celery worker --loglevel=info`
4. Start the Flask application by running:

`python app.py`

The API will be launched at [http://localhost:5000](http://localhost:5000)
