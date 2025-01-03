# backend/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from os import path

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your-secret-key-here'  # Use a strong secret key
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    
    # Register blueprints
    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    # Set up database creation
    create_database(app)
    
    # Set up login manager
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        from .models import User
        return User.query.get(int(id))
    
    return app

def create_database(app):
    if not path.exists('backend/' + DB_NAME):  # Path relative to backend folder
        with app.app_context():
            db.create_all()
        print('Created Database!')

# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from os import path
# from flask_login import LoginManager

# db = SQLAlchemy()
# DB_NAME = "database.db"

# def create_app():
#     app = Flask(__name__)
#     app.config['SECRET_KEY'] = 'hasidaksjdakjsbd'  # In production, keep this secret
#     app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
#     db.init_app(app)
    
#     # Blueprints
#     from .views import views
#     from .auth import auth

#     app.register_blueprint(views, url_prefix='/')
#     app.register_blueprint(auth, url_prefix='/')

#     from .models import User, Note

#     # Pass the `app` instance to create_database
#     create_database(app)
    
#     login_manager = LoginManager()
#     login_manager.login_view = 'auth.login'
#     login_manager.init_app(app)

#     @login_manager.user_loader
#     def load_user(id): 
#         return User.query.get(int(id)) # By default looks for the primary key 
    
#     return app

# def create_database(app):
#     if not path.exists('website/' + DB_NAME):
#         with app.app_context():  # Use application context
#             db.create_all()
#         print('Created Database!')