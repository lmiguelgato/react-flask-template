FROM tiangolo/uwsgi-nginx-flask:python3.8

COPY docker/api/uwsgi/uwsgi.ini uwsgi.ini

COPY docker/api/nginx/nginx.conf /app/nginx.conf

COPY docker/api/nginx/nginx-d.conf /etc/nginx/conf.d/nginx.conf

COPY src/api api

RUN pip install -r api/requirements.txt
