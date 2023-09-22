import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from datetime import datetime
from collections import defaultdict
from flask_api import app
from flask_api.pdf_generator import generate_pdf
from flask_api.models import User,Booking

def test_pdf_generation():
    print('inside test_pdf_generation func')
    users =  User.query.all()

    now = datetime.now()
    current_month = now.month
    current_year = now.year
    for user in users:
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
        print(f'generating pdf for user: {user.id}')
        generate_pdf(user.id)
