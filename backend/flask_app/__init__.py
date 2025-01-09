from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from os import getenv
from flask_cors import CORS  # <-- Import CORS
from dotenv import load_dotenv
from sqlalchemy import create_engine  # Import create_engine for direct DB connection
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = getenv('SECRET_KEY')  # Use a strong secret key

    # Load environment variables
    load_dotenv()

    # Fetch variables for database connection from .env
    USER = os.getenv("user")
    PASSWORD = os.getenv("password")
    HOST = os.getenv("host")
    PORT = os.getenv("port")
    DBNAME = os.getenv("dbname")

    # Construct the SQLAlchemy connection string
    DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"

    # Set the database URI to SQLAlchemy's URI configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL

    # Initialize the database with Flask
    db.init_app(app)

    # Enable CORS for all routes (or specify certain origins)
    CORS(app)  # This will allow all domains by default

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
    
    # Test the connection directly using SQLAlchemy engine
    test_db_connection(DATABASE_URL)
    
    return app

def create_database(app):
    # No need to check if the database exists for PostgreSQL; tables will be created automatically.
    with app.app_context():
        db.create_all()
        print('Connected to Supabase and ensured tables exist!')

def test_db_connection(DATABASE_URL):
    # Create the SQLAlchemy engine
    engine = create_engine(DATABASE_URL)

    # Test the connection
    try:
        with engine.connect() as connection:
            print("Database connection successful!")
    except Exception as e:
        print(f"Failed to connect to database: {e}")
