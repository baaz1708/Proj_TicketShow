from flask_api.workers import celery 
from datetime import datetime
from celery.schedules import crontab

@celery.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    # sender.add_periodic_task(10.0,print_current_time_job.s(),name="add every 10")
    sender.add_periodic_task(crontab(minute=51, hour=17),print_test_task.s(), name="common test")
    sender.add_periodic_task(crontab(minute='*/1'), print_test_message.s())

@celery.task
def just_say_hello(name):
    print("Inside Task")
    print(f'Hello{name}')
    return f'Hello{name}'

@celery.task
def print_current_time_job():
    print('START')
    now=datetime.now()
    print("now in task=", now)
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    print("date and time =",dt_string)
    print("COMPLETE")
    return dt_string

@celery.task
def print_test_task():
    print("test laila ")

@celery.task
def print_test_message():
    print("Test message from Celery!")
