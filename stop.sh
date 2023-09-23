#!/bin/bash

# Stop the Flask app
pkill -f "python run.py"

# Stop the Celery worker and beat services
pkill -f "celery -A flask_api.workers.celery worker"
pkill -f "celery -A flask_api.workers.celery beat"

# Stop the Vue.js app
cd frontend && kill $(ps aux | grep 'npm run serve' | awk '{print $2}')

# Stop the Redis server
sudo service redis-server stop
