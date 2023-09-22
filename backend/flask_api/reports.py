import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from datetime import datetime
from collections import defaultdict
from flask_api import app
from flask_api.pdf_generator import generate_pdf
from flask_api.models import User,Booking,Venue,Show


def plot_top_shows_by_ratings():
    print('Inside plot_top_shows_ratings func')
    # Query all venues
    venues = Venue.query.all()

    for venue in venues:
        print(f'----------------VENUE{venue.id}----------------------')
        # Query all shows in the current venue
        shows = venue.shows

        # Sort shows by ratings in descending order
        sorted_shows = sorted(shows, key=lambda show: show.ratings, reverse=True)
        print(f'sorted_shows',sorted_shows)

        # Select top shows
        top_shows = sorted_shows[:10]  # Change this value to select more or fewer shows
        print(f'top_shows',top_shows)

        # Generate x (show names) and y (ratings) values for the graph
        x_values = [show.name for show in top_shows]
        y_values = [show.ratings for show in top_shows]

        # Generate the graph
        fig, ax = plt.subplots(figsize=(10, 8))
        plt.style.use('seaborn-v0_8-darkgrid')
        plt.figure(figsize=(10, 8))  # Change figure size as needed
        plt.bar(x_values, y_values, color='skyblue')
        
        # Set x and y axis ticks to integer values
        plt.gca().xaxis.set_major_locator(ticker.MaxNLocator(integer=True))
        plt.gca().yaxis.set_major_locator(ticker.MaxNLocator(integer=True))

        font = {'family': 'Comic Sans MS',
        'color':  'black',
        'weight': 'bold',
        'size': 16,
        }
        plt.xlabel('Show Name', fontdict=font)
        plt.ylabel('Ratings', fontdict=font)
        plt.title(f'Top Shows by Ratings at {venue.name}',fontdict=font)
        
        # Customize ticks
        plt.xticks(fontsize=10, rotation=30, ha='right')
        plt.yticks(fontsize=10)
        # Save the figure
        plt.savefig(f'static/images/top_shows_{venue.name}.png')

    plt.close()
    venue_names = [venue.name for venue in venues]
    return venue_names

def plot_booking_across_time(user):
    print('inside plot_booking_accross func')
    now = datetime.now()
    current_month = now.month
    current_year = now.year
    print(f'-----------USER{user.id}------------')
    bookings = Booking.query.filter_by(user_id=user.id).filter(Booking.timestamp >= datetime(current_year, current_month, 1)).all()

    # Count bookings per month
    booking_counts = defaultdict(int)
    for booking in bookings:
        day = booking.timestamp.day
        booking_counts[day] += 1

    print(f'booking_counts={booking_counts}')
    # Sort days
    sorted_days = sorted(booking_counts.items())
    print(f'sorted_days={sorted_days}')

    # Generate x (day) and y (number of bookings) values for the graph
    x_values = [item[0] for item in sorted_days]
    y_values = [item[1] for item in sorted_days]    #or x_values, y_values = zip(*sorted_days) for more efficiency

    print(f'x_values={x_values}')
    print(f'y_values={y_values}')
    # Generate the graph
    plt.style.use('seaborn-v0_8-darkgrid')
    plt.scatter(x_values, y_values)

    # Set x and y axis limits
    if x_values and y_values:
        plt.xlim(1, max(x_values)+1)
        plt.ylim(0, max(y_values)+1)
    else:
        plt.xlim(1, 31)
        plt.ylim(0, 10)
    
    # Set x and y axis ticks to integer values
    plt.gca().xaxis.set_major_locator(ticker.MaxNLocator(integer=True))
    plt.gca().yaxis.set_major_locator(ticker.MaxNLocator(integer=True))

    plt.xlabel('Day of Month')
    plt.ylabel('Number of Bookings')
    plt.title(f'Number of Bookings Over Time for User {user.username}')
    
    # Save the figure
    plt.savefig(f'static/images/timed_booking_{user.id}.png')

    plt.close()


def generate_report():
    venue_names=plot_top_shows_by_ratings()
    plt.clf()
    users=User.query.all()
    for user in users:
        plot_booking_across_time(user)
        print(f'generating pdf for user: {user.id}')
        generate_pdf(user.id,venue_names) #['Atlanta','BTS complex','Gold','Kamekar Cineplex','Silver Cinema','Vrikutmpalam']
        plt.clf()
    plt.close('all')


