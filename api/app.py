import random
import time
import uuid
from requests import post
from datetime import datetime
from celery import Celery

from flask import (
    Flask,
    make_response,
    request,
    session,
    url_for,
    jsonify,
    current_app
    )
from flask_socketio import (
    SocketIO,
    emit,
    disconnect,
    join_room,
    leave_room
)
from flask_cors import CORS


app = Flask(__name__)
app.clients = {}
CORS(app)
app.config['SECRET_KEY'] = 'top-secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

# Redis
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

# Initialize Celery
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)


@celery.task()
def long_task(room, url):
    """Background task that runs a long function with progress reports."""
    verb = ['Starting up', 'Booting', 'Repairing', 'Loading', 'Checking']
    adjective = ['master', 'radiant', 'silent', 'harmonic', 'fast']
    noun = ['solar array', 'particle reshaper', 'cosmic ray', 'orbiter', 'bit']
    message = ''
    total = random.randint(10, 50)

    for i in range(total):
        if not message or random.random() < 0.25:
            message = "{0} {1} {2} ...".format(random.choice(verb),
                                               random.choice(adjective),
                                               random.choice(noun))

        meta = {'current': i,
                'total': total,
                'status': message,
                'room': room}

        post(url, json=meta)
        time.sleep(0.5)

    meta = {'current': 100,
            'total': 100,
            'status': 'Done.',
            'room': room}
    post(url, json=meta)
    return meta


@app.route('/clients', methods=['GET'])
def clients():
    print(app.clients)
    return make_response(jsonify({'clients': list(app.clients.keys())}))


@app.route('/job', methods=['POST'])
def longtask():
    userid = request.json['user_id']
    room = f'uid-{userid}'
    print('--------------- I am in longtask route')
    long_task.delay(room, url_for('status', _external=True, _method='POST'))
    return make_response(
        jsonify(
            {'status': f"Started at {datetime.now().strftime('%H:%M:%S')}"}
            )
        )


@app.route('/status', methods=['POST'])
def status():
    room = request.json['room']
    print('---------------- EMIT STATUS', room)
    emit('status', request.json, room=room, namespace='/')

    return jsonify({})


@socketio.on('connect')
def events_connect():
    userid = str(uuid.uuid4())
    session['userid'] = userid
    print(request.namespace)
    current_app.clients[userid] = request.namespace
    print('--------------- Client connected! Assigned user id', userid)
    room = f'uid-{userid}'
    print('--------------- Room', room)
    join_room(room)
    print('what ever')
    emit('connected', {'user_id': userid})
    print('after emit what ever')


@socketio.on('disconnect request')
def disconnect_request():
    emit('status', {'status': 'Disconnected!'})
    disconnect()


@socketio.on('disconnect')
def events_disconnect():
    del current_app.clients[session['userid']]
    room = f"uid-{session['userid']}"
    leave_room(room)
    print('Client %s disconnected' % session['userid'])


if __name__ == '__main__':
    socketio.run(app, debug=True)
