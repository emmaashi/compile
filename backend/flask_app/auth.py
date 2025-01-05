from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    # Get email and password from the request body (JSON)
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    # Look for a user with the provided email
    user = User.query.filter_by(email=email).first()

    if user:
        # Check the password hash
        if check_password_hash(user.password, password):
            login_user(user, remember=True)  # Log the user in
            return jsonify({"message": "Logged in successfully!"}), 200
        else:
            return jsonify({"message": "Incorrect password, try again."}), 401
    else:
        return jsonify({"message": "Email does not exist."}), 404

@auth.route('/logout')
@login_required # makes sure you can't access this route unless the user is logged in 
def logout():
    logout_user()  # Logs out the current user
    return jsonify({"message": "Logged out successfully"}), 200

@auth.route('/sign-up', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        email = request.json.get('email')
        first_name = request.json.get('firstName')
        last_name = request.json.get('lastName')
        password1 = request.json.get('password1')
        password2 = request.json.get('password2')

        user = User.query.filter_by(email=email).first()

        # Simple authentication
        if user:
            return jsonify({"message": "User already exists."}), 409
        elif len(email) < 4:
            return jsonify({"message": "Email must be greater than 4 characters."}), 400
        elif len(first_name) < 2:
            return jsonify({"message": "First name must be longer than 1 character."}), 400
        elif password1 != password2:
            return jsonify({"message": "Passwords do not match."}), 400
        elif len(password1) < 7:
            return jsonify({"message": "Password must be at least 7 characters."}), 400
        else:
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(password1, method='pbkdf2:sha256'))
            # new_user = User(email=email, first_name=first_name, last_name=last_name, password=generate_password_hash(password1, method='pbkdf2:sha256'))
            db.session.add(new_user)  # Add the new user to the database
            db.session.commit()
            return jsonify({"message": "Account successfully created!", "redirect_url": "/home"}), 201


    return jsonify({"message": "Invalid request method."}), 405