from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        # Looking for an entry
        user = User.query.filter_by(email=email).first() 
        if user: 
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True) # Remembers the fact that the user is logged in 
                return redirect(url_for('views.home'))
            else: 
                flash('Incorrect password, try again.', category='error')
        # Otherwise, email does not exist
        else: 
            flash('Email does not exist.', category='error')

    return render_template("login.html", text="Testing", user="Tim", boolean=True)

@auth.route('/logout')
@login_required # makes sure you can't access this route unless the user is logged in 
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(email=email).first() 

        # Simple authentication 
        if user: 
            flash('User already exists.', category='error')
        elif len(email) < 4: 
            flash('Email must be greater that 4 characters.', category='error')
        elif len(first_name) < 2: 
            flash('First name must be longer than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords do not match.', category='error')
        elif len(password1) < 7:
            flash('Length of password must be at least 7 characters.', category='error')
        else: 
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(password1, method='pbkdf2:sha256'))
            db.session.add(new_user) # Add the new user to the database
            db.session.commit()
            login_user(user, remember=True)
            flash('Account successfully created!', category='success')
            return redirect(url_for('views.home'))


    return render_template("sign-up.html", user=current_user)
