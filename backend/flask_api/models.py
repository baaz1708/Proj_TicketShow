from flask_api import db
from datetime import datetime

#Association table
users_roles = db.Table( 'users_roles' ,db.Model.metadata
        ,db.Column( 'user_id' ,db.Integer, db.ForeignKey( 'user.id' ) )
        ,db.Column( 'role_id' ,db.Integer ,db.ForeignKey( 'role.id' ) )
)

# Association table
shows_tags = db.Table( 'shows_tags' ,db.Model.metadata
        ,db.Column( 'show_id' ,db.Integer, db.ForeignKey( 'show.id' ) )
        ,db.Column( 'tag_id' ,db.Integer, db.ForeignKey( 'tag.id' ) )
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    roles = db.relationship('Role', secondary=users_roles, backref=db.backref('users', lazy='dynamic'))
    bookings = db.relationship('Booking', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'roles': [role.role for role in self.roles],
            'bookings': [booking.to_dict() for booking in self.bookings]
        }
    def __repr__(self):
        return f"<User {self.username}>, <emai {self.email}>, <id {self.id}>, <roles {self.roles}>"

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(10), unique=True, nullable=False)
    def __repr__(self):
        return f"<Role {self.role}>"
    
class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    venues = db.relationship('Venue', backref='city', lazy=True)
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    def __repr__(self):
        return f"<City {self.name}>"

class Venue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'))
    capacity = db.Column(db.Integer, nullable=False)
    dateadded = db.Column(db.DateTime, default=datetime.utcnow)
    shows = db.relationship('Show', backref='venue', lazy=True)
    def __repr__(self):
        return f"<Venue {self.name}>"

class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'))
    cover_image = db.Column(db.String(200), nullable=True)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    price = db.Column(db.Integer, nullable=True)
    till_date = db.Column(db.DateTime, nullable=False)
    ratings = db.Column(db.Integer, nullable=False)
    selected_tags = db.relationship('Tag', secondary=shows_tags, backref=db.backref('shows', lazy='dynamic'))
    selected_timings = db.Column(db.String(100), nullable=False)
    bookings = db.relationship('Booking', backref='show', lazy=True)
    def __repr__(self):
        return f"<Show {self.name}>"

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(400), unique=True, nullable=False)
    def __repr__(self):
        return f"<Tag {self.name}>"


class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    booked_date = db.Column(db.DateTime, nullable=False)
    booked_slots = db.Column(db.String(450), nullable=False)
    def __repr__(self):
        return f"<Booking {self.show_id}>"