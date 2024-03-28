#!/bin/bash

# Start virtual environment
source .venv/bin/activate

# Start the redis server
sudo service redis-server start

# Check if redis server is running
while ! (redis-cli ping)
do
  echo "Waiting for Redis server to start..."
  sleep 1
done

echo "Redis server is running. Starting Celery services..."

# Start the celery beat
cd ./backend && celery -A flask_api.workers.celery beat --max-interval 1 -l info &

# Start the celery worker
cd ./backend && celery -A flask_api.workers.celery worker --loglevel=info &

# Start the Flask app
cd ./backend && python run.py &

# Start the Vue.js app
cd ./frontend && npm run serve &
