import json
from flask import request,jsonify
from datetime import datetime
from werkzeug.datastructures import ImmutableMultiDict
from flask_api import app,db,bcrypt
from flask_api.models import User,City,Venue,Show,Tag,Booking

@app.route('/')
def index():
    data = {
        "name": "John",
        "age": 30,
        "city": "New York"
    }
    data_string = json.dumps(data)  # Convert dictionary to string
    tosend_data = json.loads(data_string)  # Convert string to dictionary
    return jsonify(tosend_data)

@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    if data:
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(username=data['username'], email=data['email'], password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    else:
        return jsonify({"message": "Invalid payload."}), 400

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    if data:
        user = User.query.filter_by(email=data['email']).first()
        if user and bcrypt.check_password_hash(user.password, data['password']):
            return jsonify(user.to_dict()), 200
        else:
            return jsonify({"message": "Invalid credentials."}), 401
    else:
        return jsonify({"message": "Invalid payload."}), 400

@app.route("/cities", methods=['GET'])
def get_cities():
    cities = [city.to_dict() for city in City.query.all()]
    return jsonify(cities), 200

@app.route("/cities/<int:id>", methods=['GET'])
def get_city(id):
    city = db.session.get(City, id)
    if city:
        return jsonify(city.to_dict()), 200
    else:
        return jsonify({"message": "City not found."}), 404

# GET all venues
@app.route("/venues", methods=['GET'])
def get_venues():
    venues = [venue.to_dict() for venue in Venue.query.all()]
    return jsonify(venues), 200

# POST a new venue
@app.route("/venues", methods=['POST'])
def post_venue():
    data = request.get_json()
    if data:
        venue = Venue(name=data['name'], city_id=data['city_id'], capacity=data['capacity'])  
        db.session.add(venue)
        db.session.commit()
        return jsonify(venue.to_dict()), 201
    else:
        return jsonify({"message": "Invalid payload."}), 400

# GET a specific venue by id
@app.route("/venues/<int:id>", methods=['GET'])
def get_venue(id):
    venue = db.session.get(Venue, id)
    if venue:
        return jsonify(venue.to_dict()), 200
    else:
        return jsonify({"message": "Venue not found."}), 404

# UPDATE a specific venue by id
@app.route("/venues/<int:id>", methods=['PUT'])
def update_venue(id):
    data = request.get_json()
    print(type(data))
    venue = db.session.get(Venue, id)
    print(venue)
    if venue and data:
        for key, value in data.items():
            setattr(venue, key, value)
        db.session.commit()
        return jsonify(venue.to_dict()), 200
    else:
        return jsonify({"message": "Invalid payload or venue not found."}), 400

# DELETE a specific venue by id
@app.route("/venues/<int:id>", methods=['DELETE'])
def delete_venue(id):
    venue = db.session.get(Venue, id)
    if venue:
        db.session.delete(venue)
        db.session.commit()
        return jsonify({"message": "Venue deleted."}), 200
    else:
        return jsonify({"message": "Venue not found."}), 404

@app.route('/shows', methods=['POST'])
def post_show():
    data = request.get_json()

    new_show = Show(
        name=data['name'],
        cover_image=data['cover_image'],
        ratings=data['ratings'],
        price=data['price'],
        selected_timings=json.dumps(data['selected_timings']),
        till_date=datetime.strptime(data['till_date'], "%Y-%m-%dT%H:%M:%S.%fZ"),
        venue_id=data['venue_id']
    )
    # Add tags
    for tag_name in data['selected_tags']:
        tag = Tag.query.filter_by(name=tag_name).first()
        if tag is None:
            tag = Tag(name=tag_name)
            db.session.add(tag)
        new_show.selected_tags.append(tag)

    db.session.add(new_show)
    db.session.commit()

    return jsonify(new_show.to_dict()), 201

@app.route('/shows/<int:id>', methods=['GET'])
def get_show(id):
    show = db.session.get(Show, id)
    if show:
        return jsonify(show.to_dict())
    else:
        return jsonify({"message": "Show not found."}), 404
    
@app.route('/shows/<int:id>', methods=['PUT'])
def put_show(id):
    show = db.session.get(Show, id)
    if show:
        data = request.get_json()
        print(data)
        show.name = data['name']
        show.cover_image = data['cover_image']
        show.ratings = data['ratings']
        show.price = data['price']
        show.selected_timings = json.dumps(data['selected_timings'])
        show.till_date = datetime.strptime(data['till_date'], "%Y-%m-%dT%H:%M:%S.%fZ")
        # Add tags
        show.selected_tags = []
        for tag_name in data['selected_tags']:
            tag = Tag.query.filter_by(name=tag_name).first()
            if tag is None:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            show.selected_tags.append(tag)

        db.session.commit()
        return jsonify(show.to_dict()), 200
    else:
        return jsonify({"message": "Show not found."}), 404

@app.route('/shows/<int:id>', methods=['DELETE'])
def delete_show(id):
    show = db.session.get(Show, id)
    if show:
        db.session.delete(show)
        db.session.commit()
        return jsonify({"message": "Show deleted."}), 200
    else:
        return jsonify({"message": "Show not found."}), 404
    
@app.route('/bookings', methods=['POST'])
def post_booking():
    data = request.get_json()

    new_booking = Booking(
        show_id = data['show_id'],
        user_id = data['user_id'],
        booked_date = datetime.strptime(data['booked_date'], "%Y-%m-%dT%H:%M:%S.%fZ"),
        booked_slots = json.dumps(data['booked_slots'])
    )
    db.session.add(new_booking)
    db.session.commit()

    return jsonify(new_booking.to_dict()),201

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = db.session.get(User, id)
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({"message": "User not found."}), 404