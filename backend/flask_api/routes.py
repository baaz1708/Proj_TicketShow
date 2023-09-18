from flask import request,jsonify
from werkzeug.datastructures import ImmutableMultiDict
from flask_api import app,db,bcrypt
from flask_api.models import User,City,Venue,Show,Tag,Booking

@app.route('/')
def index():
    return "Hello, World!"

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
