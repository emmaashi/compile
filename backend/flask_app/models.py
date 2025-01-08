from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
# Database models - one for notes, one for users

# Associate each note to a user
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(1000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) # user is the class, id is the field from below, 
                                                              # when you do foreign key it's lowercase

# Schema to store users
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    # last_name = db.Column(db.String(150))
    notes = db.relationship('Note') # capital for the relationship (refrencing the name of the class)