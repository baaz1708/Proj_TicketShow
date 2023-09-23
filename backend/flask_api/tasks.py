import csv
from flask_api import mail
from flask_mail import Message
from flask_api.models import User,Venue
from flask_api.reports import generate_report
from flask import current_app
from flask_api.workers import celery 
from datetime import datetime
from celery.schedules import crontab
from celery import chain


@celery.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    # sender.add_periodic_task(10.0,print_current_time_job.s(),name="add every 10")
    # sender.add_periodic_task(crontab(minute='*/2'), report_generator.s())
    sender.add_periodic_task(crontab(minute=51, hour=18),send_daily_notification.s(), name="daily notifying via email task")
    sender.add_periodic_task(crontab(minute=0, hour=10, day_of_month=1),report_generator.s(), name="report generation task")

@celery.task
def just_say_hello(name):
    print("Inside Task")
    print(f'Hello{name}')
    return f'Hello{name}'

@celery.task
def print_current_time_job():
    print('START')

@celery.task
def send_daily_notification():
    users = User.query.all()
    print("inside notificaiton task")
    for user in users:
        msg=Message('You have not booked any show today',sender='noreply@demo.com',recipients=[user.email])
        msg.body=f'''Check amazing shows to watch today with high ratings, visit the following link:
http://localhost:8080/

See you at theatre from Ticket Show ,🥳🍿
'''
        mail.send(msg)


@celery.task
def generate_report_task():
    generate_report()

@celery.task
def report_generator():
    print("Inside report_generator")
    chain(generate_report_task.s(), send_mail.s())()

@celery.task
def send_mail(_=None):
    users = User.query.all()
    print("inside report mail send task")
    for user in users:
        msg=Message('You have not booked any show today',sender='noreply@demo.com',recipients=[user.email])
        msg.body=f'''Check amazing shows to watch today with high ratings, visit the following link:
http://localhost:8080/

See you at theatre from Ticket Show ,🥳🍿
'''
        with current_app.open_resource(f'../static/pdfs/user_report_{user.id}.pdf') as fp:
            msg.attach("monthly_stats_(TicketShow).pdf", "application/pdf", fp.read())
        mail.send(msg)
    print('Mail sent')

@celery.task
def export_venues_job():
    print('Initialized exporting to csv process')
    venues = Venue.query.all()
    for venue in venues:
        with open(f'static/exported_csvs/{venue.name}.csv', 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["ID", "Name", "City ID", "Capacity", "Date Added"])
            writer.writerow([venue.id, venue.name, venue.city_id, venue.capacity, venue.dateadded])
            writer.writerow(["Shows"])
            for show in venue.shows:
                writer.writerow([show.id, show.name, show.cover_image, show.date_added, show.price, show.till_date, show.ratings])
